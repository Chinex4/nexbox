import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import SearchScreen from "../../screens/SearchScreen";
import MovieDetailScreen from "../../screens/MoviewDetailScreen";
import WishlistScreen from "../../screens/WIshListScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

export type RootStackParamList = {
  Tabs: undefined;
  MovieDetail: { id: number; title?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();



function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#242A32", borderTopColor: "#1b2027" },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#9aa4b2",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WishlistScreen}
        options={{
          title: "Watch list",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#242A32" },
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
    </Stack.Navigator>
  );
}
