import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { fetchByCategory, fetchSearch, setActiveTab, clearSearch } from "../app/store/slices/movies.slice";
import type { CategoryKey } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";

const CATS: { key: CategoryKey; label: string }[] = [
  { key: "now_playing", label: "Now playing" },
  { key: "upcoming", label: "Upcoming" },
  { key: "top_rated", label: "Top rated" },
  { key: "popular", label: "Popular" },
];

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { activeTab, byCategory, search, status } = useAppSelector((s: any) => s.movies);
  const [page, setPage] = useState(1);

  // initial fetch for default tab
  useEffect(() => {
    if (!byCategory[activeTab]) dispatch(fetchByCategory({ category: activeTab, page: 1 }));
  }, [activeTab]);

  const data = useMemo(() => {
    if (search.data?.results && search.query) return search.data.results;
    return byCategory[activeTab]?.results ?? [];
  }, [search, activeTab, byCategory]);

  const totalPages = search.query ? (search.data?.total_pages ?? 1) : (byCategory[activeTab]?.total_pages ?? 1);

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
    dispatch(fetchSearch({ query: q, page: 1 }));
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#242A32", paddingTop: 8 }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <Text style={{ color: "#fff", fontWeight: "800", fontSize: 22, marginBottom: 12 }}>
          What do you want to watch?
        </Text>
        <SearchBar onSubmit={handleSubmitSearch} />
      </View>

      {/* category pills */}
      <FlatList
        data={CATS}
        keyExtractor={(i) => i.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, paddingLeft: 16 }}
        renderItem={({ item }) => {
          const active = item.key === activeTab && !search.query;
          return (
            <Pressable
              onPress={() => { dispatch(clearSearch()); dispatch(setActiveTab(item.key)); setPage(1); }}
              style={{
                paddingHorizontal: 12,
                height: 32,
                borderRadius: 16,
                marginRight: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: active ? "#3a80f7" : "#3a3f47",
              }}
            >
              <Text style={{ color: active ? "#fff" : "#c8d0d9", fontWeight: "700", fontSize: 12 }}>
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

      {/* grid */}
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
        data={data}
        keyExtractor={(it) => it.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
        ListEmptyComponent={
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text style={{ color: "#9aa4b2" }}>{status === "loading" ? "Loading..." : "No movies found"}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => nav.navigate("MovieDetail", { id: item.id, title: item.title })}
          />
        )}
      />
    </View>
  );
}
