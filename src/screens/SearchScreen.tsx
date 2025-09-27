import React from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
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
    <View style={styles.container}>
      <SearchBar initial={search.query} onSubmit={handleSubmit} />
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(it) => it.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              nav.navigate("MovieDetail", { id: item.id, title: item.title })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Try searching for a movie.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    padding: 16,
    paddingTop: Platform.select({ ios: 70, android: 50 }),
  },
  list: { marginTop: 16 },
  gridRow: { justifyContent: "space-between" },
  empty: { color: "#9aa4b2", marginTop: 24 },
});
