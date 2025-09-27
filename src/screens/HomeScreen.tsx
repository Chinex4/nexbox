import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import {
  fetchByCategory,
  fetchSearch,
  setActiveTab,
  clearSearch,
} from "../app/store/slices/movies.slice";
import type { CategoryKey } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { loadWishlist } from "../app/store/slices/wishlist.slice";

const CATS: { key: CategoryKey; label: string }[] = [
  { key: "now_playing", label: "Now playing" },
  { key: "upcoming", label: "Upcoming" },
  { key: "top_rated", label: "Top rated" },
  { key: "popular", label: "Popular" },
];

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { activeTab, byCategory, search, status } = useAppSelector(
    (s: any) => s.movies
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(loadWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (!byCategory[activeTab])
      dispatch(fetchByCategory({ category: activeTab, page: 1 }));
  }, [activeTab]);

  const data = useMemo(() => {
    if (search.data?.results && search.query) return search.data.results;
    return byCategory[activeTab]?.results ?? [];
  }, [search, activeTab, byCategory]);

  const totalPages = search.query
    ? search.data?.total_pages ?? 1
    : byCategory[activeTab]?.total_pages ?? 1;

  function onEndReached() {
    const nextPage = page + 1;
    if (nextPage <= totalPages && status !== "loading" && !search.query) {
      setPage(nextPage);
      dispatch(fetchByCategory({ category: activeTab, page: nextPage }));
    }
  }

  function handleSubmitSearch(q: string) {
    if (!q) {
      dispatch(clearSearch());
      return;
    }
    setPage(1);
    dispatch(fetchSearch({ query: q, page: 1 }));
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>What do you want to watch?</Text>
          <SearchBar onSubmit={handleSubmitSearch} />
        </View>
        <FlatList
          data={CATS}
          keyExtractor={(i) => i.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catList}
          renderItem={({ item }) => {
            const active = item.key === activeTab && !search.query;
            return (
              <Pressable
                onPress={() => {
                  dispatch(clearSearch());
                  dispatch(setActiveTab(item.key));
                  setPage(1);
                }}
                style={[
                  styles.catPill,
                  { backgroundColor: active ? "#3a80f7" : "#3a3f47" },
                ]}
              >
                <Text
                  style={[
                    styles.catPillText,
                    { color: active ? "#fff" : "#c8d0d9" },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
        <FlatList
          contentContainerStyle={styles.gridContent}
          data={data}
          keyExtractor={(it) => it.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          onEndReachedThreshold={0.4}
          onEndReached={onEndReached}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>
                {status === "loading" ? "Loading..." : "No movies found"}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() =>
                nav.navigate("MovieDetail", { id: item.id, title: item.title })
              }
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#242A32", paddingTop: 8 },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.select({ ios: 70, android: 50 }),
  },
  title: { color: "#fff", fontWeight: "800", fontSize: 22, marginBottom: 12 },
  catList: { marginTop: 16, paddingLeft: 16 },
  catPill: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  catPillText: { fontWeight: "700", fontSize: 12 },
  gridContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    marginTop: 8,
  },
  gridRow: { justifyContent: "space-between" },
  emptyWrap: { alignItems: "center", marginTop: 40 },
  emptyText: { color: "#9aa4b2" },
});
