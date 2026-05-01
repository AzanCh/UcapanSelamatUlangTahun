import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const createGreeting = async (payload) => {
  const { data } = await api.post("/greetings", payload);
  return data;
};

export const fetchGreeting = async (slug) => {
  const { data } = await api.get(`/greetings/${slug}`);
  return data;
};

export const uploadAudio = async (file, onProgress) => {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await api.post("/upload/audio", fd, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return data;
};

export const uploadImage = async (file, onProgress) => {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await api.post("/upload/image", fd, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
  return data;
};
