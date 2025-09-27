import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchBar({
  initial = "",
  onSubmit,
}: {
  initial?: string;
  onSubmit: (q: string) => void;
}) {
  const [q, setQ] = useState(initial);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3a3f47",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
      }}
    >
      <Ionicons name="search" size={20} color="#9aa4b2" />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#9aa4b2"
        value={q}
        onChangeText={setQ}
        onSubmitEditing={() => onSubmit(q.trim())}
        style={{ color: "#fff", flex: 1, marginLeft: 8 }}
        returnKeyType="search"
      />
      {q.length > 0 && (
        <Pressable
          onPress={() => {
            setQ("");
            onSubmit("");
          }}
        >
          <Ionicons name="close" size={18} color="#9aa4b2" />
        </Pressable>
      )}
    </View>
  );
}
