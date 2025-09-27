import api from "./api";

export async function getPopularMovies(page = 1) {
  const res = await api.get("/movie/popular", { params: { page } });
  return res.data;
}

export function getImageUrl(path: string, size = "w500") {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
