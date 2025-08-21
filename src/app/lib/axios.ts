import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const api = axios.create({baseURL: process.env.NEXT_PUBLIC_API_URL});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Only run in browser
    let requestId = localStorage.getItem("requestId");

    if (!requestId) {
      requestId = uuidv4();
      localStorage.setItem("requestId", requestId);
    }

    config.headers["x-request-id"] = requestId;
  }
  return config;
});

export default api;
