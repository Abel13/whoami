import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import * as ScreenOrientation from "expo-screen-orientation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { init } from "@amplitude/analytics-react-native";
import { vexo } from "vexo-analytics";
import Aptabase from "@aptabase/react-native";
import { useAmplitude } from "@/hooks/useAmplitude";
import { useVexo } from "@/hooks/useVexo";
import { useAptabase } from "@/hooks/useAptabase";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();
init(process.env.EXPO_PUBLIC_AMPLITUDE_API_KEY!);
vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY!);

Aptabase.init(process.env.EXPO_PUBLIC_APTABASE_API_KEY!);

export default function RootLayout() {
  const { appOpen: appOpenAmplitude } = useAmplitude();
  const { appOpen: appOpenVexo } = useVexo();
  const { appOpen: appOpenAptabase } = useAptabase();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Montserrat.ttf"),
  });

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    appOpenAmplitude();
    appOpenVexo();
    appOpenAptabase();
    changeScreenOrientation();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          navigationBarHidden: true,
          autoHideHomeIndicator: true,
          orientation: "landscape_left",
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
        <Stack.Screen
          name="about"
          options={{
            animation: "slide_from_bottom",
            presentation: "transparentModal",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar hidden />
    </GestureHandlerRootView>
  );
}
