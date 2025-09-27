import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { useAppSelector, useAppDispatch } from "../app/store/hooks";
import {
  removeFromWishlist,
  clearWishlist,
} from "../app/store/slices/wishlist.slice";
import { useNavigation } from "@react-navigation/native";
import MovieCard from "../components/MovieCard";

export default function WishlistScreen() {
  const nav = useNavigation<any>();
  const dispatch = useAppDispatch();
  const items = useAppSelector((s: any) => s.wishlist?.items ?? []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>My Wishlist</Text>
        {items.length > 0 && (
          <Pressable
            onPress={() => dispatch(clearWishlist())}
            style={styles.clearBtn}
            hitSlop={6}
          >
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        contentContainerStyle={styles.content}
        data={items}
        keyExtractor={(it) => it.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.empty}>No saved movies yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.cardCol}>
            <MovieCard
              movie={item}
              onPress={() =>
                nav.navigate("MovieDetail", { id: item.id, title: item.title })
              }
            />
            <Pressable
              onPress={() => dispatch(removeFromWishlist(item.id))}
              style={styles.removeBtn}
              hitSlop={8}
            >
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242A32",
    paddingTop: Platform.select({ ios: 70, android: 50 }),
  },
  topBar: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  clearBtn: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a3f47",
  },
  clearText: { color: "#c8d0d9", fontWeight: "700", fontSize: 12 },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 },
  cardCol: { width: "48%", marginBottom: 16 },
  row: { justifyContent: "space-between" },
  empty: { color: "#9aa4b2", marginTop: 40, textAlign: "center" },
  cardWrap: { marginBottom: 12 },
  removeBtn: {
    marginTop: 8,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a3f47",
  },
  removeText: { color: "#c8d0d9", fontWeight: "600", fontSize: 12 },
});
