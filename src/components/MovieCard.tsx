import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { getImageUrl, yearFrom } from "../services/tmdb";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MovieCard({
  movie,
  onPress,
}: {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date?: string;
    vote_average?: number;
  };
  onPress: () => void;
}) {
  return (
    <Pressable style={{ width: "48%", marginBottom: 16 }} onPress={onPress}>
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: getImageUrl(movie.poster_path, "w342") }}
          style={{ width: "100%", height: 220, borderRadius: 10 }}
        />
        <View
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: "#1b2027",
            borderRadius: 12,
            paddingHorizontal: 6,
            paddingVertical: 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="star" size={12} color="#febe2e" />
          <Text style={{ color: "#fff", marginLeft: 4, fontSize: 12 }}>
            {(movie.vote_average ?? 0).toFixed(1)}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={{ color: "#fff", marginTop: 8, fontWeight: "700" }}
      >
        {movie.title}
      </Text>
      <Text style={{ color: "#9aa4b2", marginTop: 2, fontSize: 12 }}>
        {yearFrom(movie.release_date)}
      </Text>
    </Pressable>
  );
}
