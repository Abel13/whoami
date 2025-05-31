import { useFonts } from "expo-font";
import { Stack, usePathname, useGlobalSearchParams, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import * as ScreenOrientation from "expo-screen-orientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { init } from "@amplitude/analytics-react-native";

SplashScreen.preventAutoHideAsync();
init(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY || "");

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Montserrat.ttf"),
  });
  const screenOptions =
    Platform.OS === "android"
      ? {
          statusBarHidden: true,
        }
      : {};

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          ...screenOptions,
          headerShown: false,
          navigationBarHidden: true,
          autoHideHomeIndicator: true,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen
          name="result"
          options={{
            animation: "slide_from_bottom",
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            animation: "slide_from_bottom",
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            animation: "slide_from_bottom",
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="auto" hidden />
    </GestureHandlerRootView>
  );
}
