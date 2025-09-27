import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AppProviders from "./src/app/providers/AppProviders";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  useEffect(() => {
    const t = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return <AppProviders />;
}
