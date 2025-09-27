import axios from "axios";
import { TMDB_API_KEY } from "@env";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: TMDB_API_KEY,
    language: "en-US",
  },
});

export default api;
