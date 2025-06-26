import { trackEvent } from "@aptabase/react-native";
import { useCallback } from "react";
import * as Application from "expo-application";

export const useAptabase = () => {
  const appVersion = Application.nativeApplicationVersion;
  const appOpen = useCallback(() => {
    trackEvent("open-app", {
      app_version: appVersion,
    });
  }, []);

  const bmc = useCallback(() => {
    trackEvent("bmc-click", {});
  }, []);

  const gameStarted = useCallback((gameId: string, timeout: number) => {
    const eventProperties = {
      gameId,
      timeout,
    };
    trackEvent("Game Started", eventProperties);
  }, []);

  const gameEnd = useCallback(
    (gameId: string, pass: number, correct: number) => {
      const eventProperties = {
        gameId,
        pass,
        correct,
      };
      trackEvent("Game End", eventProperties);
    },
    []
  );

  return {
    gameStarted,
    gameEnd,
    appOpen,
    bmc,
  };
};
