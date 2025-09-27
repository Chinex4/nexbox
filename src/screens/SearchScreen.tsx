// src/screens/SearchScreen.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { fetchSearch, clearSearch } from "../app/store/slices/movies.slice";
import MovieCard from "../components/MovieCard";
import { useNavigation } from "@react-navigation/native";

export default function SearchScreen() {
  const dispatch = useAppDispatch();
  const nav = useNavigation<any>();
  const { search } = useAppSelector((s: any) => s.movies);

  function handleSubmit(q: string) {
    if (!q) {
      dispatch(clearSearch());
      return;
    }
    dispatch(fetchSearch({ query: q, page: 1 }));
  }

  const data = search.data?.results ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: "#242A32", padding: 16 }}>
      <SearchBar initial={search.query} onSubmit={handleSubmit} />
      <FlatList
        style={{ marginTop: 16 }}
        data={data}
        keyExtractor={(it) => it.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              nav.navigate("MovieDetail", { id: item.id, title: item.title })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: "#9aa4b2", marginTop: 24 }}>
            Try searching for a movie.
          </Text>
        }
      />
    </View>
  );
}
