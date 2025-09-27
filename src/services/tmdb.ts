import api from "./api";

export type CategoryKey = "popular" | "now_playing" | "upcoming" | "top_rated";

export async function getPopularMovies(page = 1) {
  const res = await api.get("/movie/popular", { params: { page } });
  return res.data;
}

export async function getMoviesByCategory(category: CategoryKey, page = 1) {
  const res = await api.get(`/movie/${category}`, { params: { page } });
  return res.data;
}

export async function searchMovies(query: string, page = 1) {
  const res = await api.get("/search/movie", {
    params: { query, page, include_adult: false },
  });
  return res.data;
}

export async function getMovieDetails(id: number) {
  const res = await api.get(`/movie/${id}`, {
    params: { append_to_response: "credits" },
  });
  return res.data;
}

export function getImageUrl(
  path?: string | null,
  size: "w185" | "w342" | "w500" | "original" = "w500"
) {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function yearFrom(dateStr?: string) {
  return dateStr ? new Date(dateStr).getFullYear().toString() : "";
}
