from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Request
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import secrets
import string
import shutil
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

UPLOAD_DIR = ROOT_DIR / "uploads"
AUDIO_DIR = UPLOAD_DIR / "audio"
IMAGE_DIR = UPLOAD_DIR / "images"
AUDIO_DIR.mkdir(parents=True, exist_ok=True)
IMAGE_DIR.mkdir(parents=True, exist_ok=True)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# -------- Models --------
class Photo(BaseModel):
    url: str
    caption: Optional[str] = ""


class Highlight(BaseModel):
    year: str
    title: str
    description: Optional[str] = ""


class GreetingCreate(BaseModel):
    recipient_name: str
    sender_name: Optional[str] = ""
    birthday_date: str  # ISO date string YYYY-MM-DD
    intro_message: Optional[str] = ""
    long_message: str
    photos: List[Photo] = Field(default_factory=list)
    highlights: List[Highlight] = Field(default_factory=list)
    theme: str = "elegant"  # romantic | elegant | playful | minimalist | luxury
    music_url: Optional[str] = ""
    accent_color: Optional[str] = ""
    font_override: Optional[str] = ""
    language: Optional[str] = "en"  # en | id


class Greeting(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    recipient_name: str
    sender_name: Optional[str] = ""
    birthday_date: str
    intro_message: Optional[str] = ""
    long_message: str
    photos: List[Photo] = Field(default_factory=list)
    highlights: List[Highlight] = Field(default_factory=list)
    theme: str = "elegant"
    music_url: Optional[str] = ""
    accent_color: Optional[str] = ""
    font_override: Optional[str] = ""
    language: Optional[str] = "en"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def _generate_slug(name: str) -> str:
    base = "".join(c.lower() if c.isalnum() else "-" for c in (name or "greeting")).strip("-")
    base = base[:24] if base else "greeting"
    rand = "".join(secrets.choice(string.ascii_lowercase + string.digits) for _ in range(6))
    return f"{base}-{rand}"


# -------- Routes --------
@api_router.get("/")
async def root():
    return {"message": "Birthday Greeting API"}


@api_router.post("/greetings", response_model=Greeting)
async def create_greeting(payload: GreetingCreate):
    slug = _generate_slug(payload.recipient_name)
    # ensure uniqueness
    while await db.greetings.find_one({"slug": slug}, {"_id": 0, "slug": 1}):
        slug = _generate_slug(payload.recipient_name)

    greeting = Greeting(slug=slug, **payload.model_dump())
    doc = greeting.model_dump()
    await db.greetings.insert_one(doc)
    return greeting


@api_router.get("/greetings/{slug}", response_model=Greeting)
async def get_greeting(slug: str):
    doc = await db.greetings.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Greeting not found")
    return Greeting(**doc)


@api_router.get("/greetings", response_model=List[Greeting])
async def list_greetings(limit: int = 20):
    cursor = db.greetings.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    docs = await cursor.to_list(length=limit)
    return [Greeting(**d) for d in docs]


@api_router.delete("/greetings/{slug}")
async def delete_greeting(slug: str):
    res = await db.greetings.delete_one({"slug": slug})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Greeting not found")
    return {"ok": True}


ALLOWED_AUDIO = {"audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/ogg", "audio/mp4", "audio/aac", "audio/webm", "audio/flac", "audio/x-m4a", "audio/m4a"}
EXT_FALLBACK = {"audio/mpeg": ".mp3", "audio/mp3": ".mp3", "audio/wav": ".wav", "audio/x-wav": ".wav",
                "audio/ogg": ".ogg", "audio/mp4": ".m4a", "audio/x-m4a": ".m4a", "audio/m4a": ".m4a",
                "audio/aac": ".aac", "audio/webm": ".webm", "audio/flac": ".flac"}
MAX_AUDIO_BYTES = 15 * 1024 * 1024  # 15MB


@api_router.post("/upload/audio")
async def upload_audio(request: Request, file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_AUDIO:
        raise HTTPException(status_code=400, detail=f"Unsupported audio type: {file.content_type}")
    # Determine extension
    ext = Path(file.filename or "").suffix.lower()
    if not ext:
        ext = EXT_FALLBACK.get(file.content_type, ".mp3")
    # Read with size cap
    contents = await file.read()
    if len(contents) > MAX_AUDIO_BYTES:
        raise HTTPException(status_code=413, detail="Audio file too large (max 15MB)")
    name = f"{uuid.uuid4().hex}{ext}"
    path = AUDIO_DIR / name
    with open(path, "wb") as f:
        f.write(contents)
    rel_url = f"/api/uploads/audio/{name}"
    # Build absolute URL using request
    base = str(request.base_url).rstrip("/")
    full_url = f"{base}{rel_url}"
    return {
        "url": full_url,
        "rel_url": rel_url,
        "filename": name,
        "size": len(contents),
        "content_type": file.content_type,
    }


ALLOWED_IMAGE = {"image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif"}
IMG_EXT_FALLBACK = {"image/jpeg": ".jpg", "image/jpg": ".jpg", "image/png": ".png",
                    "image/webp": ".webp", "image/gif": ".gif", "image/heic": ".heic", "image/heif": ".heif"}
MAX_IMAGE_BYTES = 10 * 1024 * 1024  # 10MB


@api_router.post("/upload/image")
async def upload_image(request: Request, file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_IMAGE:
        raise HTTPException(status_code=400, detail=f"Unsupported image type: {file.content_type}")
    ext = Path(file.filename or "").suffix.lower()
    if not ext:
        ext = IMG_EXT_FALLBACK.get(file.content_type, ".jpg")
    contents = await file.read()
    if len(contents) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Image too large (max 10MB)")
    name = f"{uuid.uuid4().hex}{ext}"
    path = IMAGE_DIR / name
    with open(path, "wb") as f:
        f.write(contents)
    rel_url = f"/api/uploads/images/{name}"
    base = str(request.base_url).rstrip("/")
    full_url = f"{base}{rel_url}"
    return {
        "url": full_url,
        "rel_url": rel_url,
        "filename": name,
        "size": len(contents),
        "content_type": file.content_type,
    }

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api")


app.include_router(api_router)
# Serve uploaded audio (and any future static uploads) under /api/uploads
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
