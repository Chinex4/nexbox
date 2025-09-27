import React from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { getImageUrl, yearFrom } from "../services/tmdb";
import Ionicons from "@expo/vector-icons/Ionicons";

type MovieLike = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
};

export default function MovieCard({
  movie,
  onPress,
}: {
  movie: MovieLike;
  onPress: () => void;
}) {
  const poster = getImageUrl(movie.poster_path, "w342");
  const rating = movie.vote_average ?? 0;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.posterWrap}>
        <Image
          source={{ uri: poster }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.badge}>
          <Ionicons name="star" size={12} color="#febe2e" />
          <Text style={styles.badgeText}>{rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text numberOfLines={1} style={styles.title}>
        {movie.title}
      </Text>
      <Text style={styles.year}>{yearFrom(movie.release_date)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%", 
  },
  posterWrap: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1b2027",
  },
  poster: {
    width: "100%",
    aspectRatio: 2 / 3, 
  },
  badge: {
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#1b2027",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  title: { color: "#fff", marginTop: 8, fontWeight: "700" },
  year: { color: "#9aa4b2", marginTop: 2, fontSize: 12 },
});
