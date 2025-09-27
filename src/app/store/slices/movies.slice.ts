import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularMovies } from "../../../services/tmdb";

export const fetchPopularMovies = createAsyncThunk("movies/fetchPopular", async () => {
  const data = await getPopularMovies();
  return data.results;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popular: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default moviesSlice.reducer;