import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://emotion-canvas-25.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def created_slugs():
    slugs = []
    yield slugs
    # teardown
    s = requests.Session()
    for slug in slugs:
        try:
            s.delete(f"{API}/greetings/{slug}", timeout=10)
        except Exception:
            pass


def _payload(name="TEST Olivia"):
    return {
        "recipient_name": name,
        "sender_name": "TEST Sender",
        "birthday_date": "2025-08-21",
        "intro_message": "Today is your day",
        "long_message": "A long heartfelt message for testing purposes.",
        "photos": [{"url": "https://images.unsplash.com/photo-1.jpg", "caption": "cap"}],
        "highlights": [{"year": "2020", "title": "Met", "description": "story"}],
        "theme": "elegant",
        "music_url": "https://example.com/song.mp3",
        "accent_color": "#D4AF37",
    }


# --- Health ---
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert isinstance(data["message"], str)


# --- Greetings CRUD ---
class TestGreetings:
    def test_create_greeting_returns_slug_and_id(self, session, created_slugs):
        r = session.post(f"{API}/greetings", json=_payload(), timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "slug" in data and isinstance(data["slug"], str) and len(data["slug"]) > 0
        assert "_id" not in data, "MongoDB _id leaked into response"
        assert data["recipient_name"] == "TEST Olivia"
        assert data["theme"] == "elegant"
        assert data["photos"][0]["url"].startswith("https://")
        assert data["highlights"][0]["title"] == "Met"
        created_slugs.append(data["slug"])

    def test_get_greeting_by_slug(self, session, created_slugs):
        assert created_slugs, "no slug to test with"
        slug = created_slugs[0]
        r = session.get(f"{API}/greetings/{slug}", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == slug
        assert "_id" not in data
        assert data["long_message"].startswith("A long heartfelt")

    def test_get_invalid_slug_returns_404(self, session):
        r = session.get(f"{API}/greetings/this-slug-does-not-exist-xyz", timeout=15)
        assert r.status_code == 404

    def test_list_greetings_with_limit(self, session, created_slugs):
        r = session.get(f"{API}/greetings?limit=5", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) <= 5
        for d in data:
            assert "_id" not in d
            assert "slug" in d

    def test_slug_uniqueness_on_multiple_creates(self, session, created_slugs):
        slugs = set()
        for _ in range(3):
            r = session.post(f"{API}/greetings", json=_payload("TEST Same Name"), timeout=15)
            assert r.status_code == 200
            slug = r.json()["slug"]
            slugs.add(slug)
            created_slugs.append(slug)
        assert len(slugs) == 3, f"slugs not unique: {slugs}"

    @pytest.mark.parametrize("theme", ["romantic", "elegant", "playful", "minimalist", "luxury"])
    def test_all_theme_keys_accepted(self, session, created_slugs, theme):
        p = _payload(f"TEST Theme {theme}")
        p["theme"] = theme
        r = session.post(f"{API}/greetings", json=p, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["theme"] == theme
        created_slugs.append(data["slug"])

    def test_delete_greeting(self, session):
        r = session.post(f"{API}/greetings", json=_payload("TEST Delete Me"), timeout=15)
        assert r.status_code == 200
        slug = r.json()["slug"]

        r2 = session.delete(f"{API}/greetings/{slug}", timeout=15)
        assert r2.status_code == 200
        assert r2.json().get("ok") is True

        # second delete -> 404
        r3 = session.delete(f"{API}/greetings/{slug}", timeout=15)
        assert r3.status_code == 404

        # GET also 404
        r4 = session.get(f"{API}/greetings/{slug}", timeout=15)
        assert r4.status_code == 404
