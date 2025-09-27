import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getMoviesByCategory,
  searchMovies,
  getPopularMovies,
  CategoryKey,
} from "../../../services/tmdb";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};

type Paged<T> = { page: number; total_pages: number; results: T[] };

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (page: number = 1) => {
    const data = await getPopularMovies(page);
    return data as Paged<Movie>;
  }
);

export const fetchByCategory = createAsyncThunk(
  "movies/fetchByCategory",
  async ({ category, page = 1 }: { category: CategoryKey; page?: number }) => {
    const data = await getMoviesByCategory(category, page);
    return { category, data } as { category: CategoryKey; data: Paged<Movie> };
  }
);

export const fetchSearch = createAsyncThunk(
  "movies/fetchSearch",
  async ({ query, page = 1 }: { query: string; page?: number }) => {
    const data = await searchMovies(query, page);
    return { query, data } as { query: string; data: Paged<Movie> };
  }
);

type MoviesState = {
  activeTab: CategoryKey;
  byCategory: Record<CategoryKey, Paged<Movie> | null>;
  search: {
    query: string;
    data: Paged<Movie> | null;
    status: "idle" | "loading" | "succeeded" | "failed";
  };
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: MoviesState = {
  activeTab: "now_playing",
  byCategory: {
    popular: null,
    now_playing: null,
    upcoming: null,
    top_rated: null,
  },
  search: { query: "", data: null, status: "idle" },
  status: "idle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<CategoryKey>) {
      state.activeTab = action.payload;
    },
    clearSearch(state) {
      state.search = { query: "", data: null, status: "idle" };
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.search.query = action.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchPopularMovies.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchPopularMovies.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.byCategory.popular = a.payload;
      })
      .addCase(fetchPopularMovies.rejected, (s) => {
        s.status = "failed";
      });

    b.addCase(fetchByCategory.pending, (s) => {
      s.status = "loading";
    })
      .addCase(fetchByCategory.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.byCategory[a.payload.category] = a.payload.data;
      })
      .addCase(fetchByCategory.rejected, (s) => {
        s.status = "failed";
      });

    b.addCase(fetchSearch.pending, (s) => {
      s.search.status = "loading";
    })
      .addCase(fetchSearch.fulfilled, (s, a) => {
        s.search.status = "succeeded";
        s.search.data = a.payload.data;
        s.search.query = a.payload.query;
      })
      .addCase(fetchSearch.rejected, (s) => {
        s.search.status = "failed";
      });
  },
});

export const { setActiveTab, clearSearch, setSearchQuery } =
  moviesSlice.actions;
export default moviesSlice.reducer;
