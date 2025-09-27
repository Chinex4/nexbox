import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type WishlistMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

type WishlistState = {
  items: WishlistMovie[];
  loaded: boolean;
};

const KEY = "@wishlist.v1";

export const loadWishlist = createAsyncThunk("wishlist/load", async () => {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as WishlistMovie[]) : [];
});

async function persist(items: WishlistMovie[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], loaded: false } as WishlistState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<WishlistMovie>) {
      const exists = state.items.find((m) => m.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((m) => m.id !== action.payload.id);
      } else {
        state.items = [action.payload, ...state.items];
      }
      if (state.loaded) persist(state.items);
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((m) => m.id !== action.payload);
      if (state.loaded) persist(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      if (state.loaded) persist(state.items);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadWishlist.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loaded = true;
    });
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
