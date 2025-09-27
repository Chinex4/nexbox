// src/screens/HomeScreen.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable
} from "react-native";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { fetchPopularMovies } from "../app/store/slices/movies.slice";
import { getImageUrl } from "../services/tmdb";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { popular, status } = useAppSelector((state: any) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={popular}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image
              source={{ uri: getImageUrl(item.poster_path) }}
              style={styles.poster}
            />
            <Text style={styles.title}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#242A32",
  },
  text: { color: "#fff" },
  card: { width: "48%", marginBottom: 16 },
  poster: { width: "100%", height: 250, borderRadius: 8 },
  title: { color: "#fff", marginTop: 8, fontSize: 14, fontWeight: "600" },
});
