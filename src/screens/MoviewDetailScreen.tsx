import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { getImageUrl, getMovieDetails } from "../services/tmdb";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { toggleWishlist } from "../app/store/slices/wishlist.slice";

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
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((s: any) => s.wishlist.items);
  const inWishlist = useMemo(
    () => wishlist.some((m: any) => m.id === id),
    [wishlist, id]
  );

  useEffect(() => {
    getMovieDetails(id)
      .then(setMovie)
      .catch(() => setMovie(null));
  }, [id]);

  if (!movie) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  const headerImage = getImageUrl(
    movie.backdrop_path ?? movie.poster_path,
    "w500"
  );
  const poster = getImageUrl(movie.poster_path, "w185");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{ uri: headerImage }}
          style={styles.heroImg}
          resizeMode="cover"
        />
        <View style={styles.heroTopBar}>
          <Ionicons
            name="chevron-back"
            size={26}
            color="#fff"
            onPress={() => nav.goBack()}
          />
          <Pressable
            onPress={() =>
              dispatch(
                toggleWishlist({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
                })
              )
            }
            hitSlop={8}
          >
            <Ionicons
              name={inWishlist ? "bookmark" : "bookmark-outline"}
              size={22}
              color="#fff"
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Image source={{ uri: poster }} style={styles.poster} />
          <View style={styles.metaCol}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="star" size={14} color="#febe2e" />
              <Text style={styles.metaPrimary}>
                {movie.vote_average.toFixed(1)}
              </Text>
              <Ionicons name="calendar-outline" size={14} color="#9aa4b2" />
              <Text style={styles.metaSecondary}>{movie.release_date}</Text>
              <Ionicons name="time-outline" size={14} color="#9aa4b2" />
              <Text style={styles.metaSecondary}>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </Text>
            </View>
            <Text style={styles.genreLine} numberOfLines={1}>
              {movie.genres.map((g) => g.name).join(" • ")}
            </Text>
          </View>
        </View>

        <View style={styles.tabsRow}>
          <Text style={styles.tabActive}>About Movie</Text>
        </View>

        <Text style={styles.overview}>{movie.overview}</Text>

        <Pressable
          onPress={() => {
            dispatch(
              toggleWishlist({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
              })
            );
          }}
          style={styles.addBtn}
        >
          <Text style={styles.addBtnText}>
            {inWishlist ? "Remove from Watch list" : "Add to Watch list"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#242A32" },
  hero: { height: 220, backgroundColor: "#1b2027" },
  heroImg: { width: "100%", height: 300 },
  heroTopBar: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: { paddingHorizontal: 16, paddingTop: 100 },
  headerRow: { flexDirection: "row" },
  poster: { width: 90, height: 130, borderRadius: 8, marginRight: 12 },
  metaCol: { flex: 1 },
  movieTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  metaPrimary: { color: "#fff", marginLeft: 6, marginRight: 12 },
  metaSecondary: { color: "#9aa4b2", marginLeft: 6, marginRight: 12 },
  genreLine: { color: "#9aa4b2", marginTop: 8 },
  tabsRow: { flexDirection: "row", marginTop: 16 },
  tabActive: { color: "#fff", fontWeight: "700" },
  tabInactive: { color: "#9aa4b2", marginLeft: 16 },
  overview: {
    color: "#c8d0d9",
    lineHeight: 22,
    marginTop: 12,
    paddingBottom: 24,
  },
  loading: {
    flex: 1,
    backgroundColor: "#242A32",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: { color: "#fff" },
  addBtn: {
    marginTop: 50,
    marginBottom: 24,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a3f47",
  },
  addBtnText: { color: "#c8d0d9", fontWeight: "600", fontSize: 16 },
});
