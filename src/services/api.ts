import axios from "axios";
import { TMDB_API_KEY } from "@env";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    language: "en-US",
    ...(TMDB_API_KEY ? { api_key: TMDB_API_KEY } : {}),
  };
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    const data = err?.response?.data;
    console.log("TMDB ERROR ⇒", status, data || err.message);
    return Promise.reject(err);
  }
);

export default api;
