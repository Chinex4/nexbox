import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/movies.slice";
import wishlistReducer from "./slices/wishlist.slice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
