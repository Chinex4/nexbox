import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { getImageUrl, getMovieDetails } from "../services/tmdb";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

type Detail = {
  id: number;
  title: string;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
  vote_average: number;
  runtime: number;
  poster_path: string | null;
  backdrop_path: string | null;
};

export default function MovieDetailScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const { id } = route.params as { id: number };
  const [movie, setMovie] = useState<Detail | null>(null);

  useEffect(() => {
    getMovieDetails(id)
      .then(setMovie)
      .catch(() => setMovie(null));
  }, [id]);

  if (!movie) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#242A32",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#242A32" }}>
      {/* header */}
      <View style={{ height: 220, backgroundColor: "#1b2027" }}>
        <Image
          source={{
            uri: getImageUrl(movie.backdrop_path ?? movie.poster_path, "w500"),
          }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        {/* simple overlay icons */}
        <View
          style={{
            position: "absolute",
            top: 44,
            left: 16,
            right: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Ionicons
            name="chevron-back"
            size={26}
            color="#fff"
            onPress={() => nav.goBack()}
          />
          <Ionicons name="bookmark-outline" size={22} color="#fff" />
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: getImageUrl(movie.poster_path, "w185") }}
            style={{ width: 90, height: 130, borderRadius: 8, marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
              {movie.title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Ionicons name="star" size={14} color="#febe2e" />
              <Text style={{ color: "#fff", marginLeft: 6, marginRight: 12 }}>
                {movie.vote_average.toFixed(1)}
              </Text>
              <Ionicons name="calendar-outline" size={14} color="#9aa4b2" />
              <Text
                style={{ color: "#9aa4b2", marginLeft: 6, marginRight: 12 }}
              >
                {movie.release_date}
              </Text>
              <Ionicons name="time-outline" size={14} color="#9aa4b2" />
              <Text style={{ color: "#9aa4b2", marginLeft: 6 }}>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </Text>
            </View>
            <Text style={{ color: "#9aa4b2", marginTop: 8 }} numberOfLines={1}>
              {movie.genres.map((g) => g.name).join(" • ")}
            </Text>
          </View>
        </View>

        {/* faux tabs header to match your UI */}
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>About Movie</Text>
          <Text style={{ color: "#9aa4b2", marginLeft: 16 }}>Reviews</Text>
          <Text style={{ color: "#9aa4b2", marginLeft: 16 }}>Cast</Text>
        </View>

        <Text
          style={{
            color: "#c8d0d9",
            lineHeight: 22,
            marginTop: 12,
            paddingBottom: 24,
          }}
        >
          {movie.overview}
        </Text>
      </View>
    </ScrollView>
  );
}
