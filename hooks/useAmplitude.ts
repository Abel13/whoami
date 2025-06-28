import { track, logEvent } from "@amplitude/analytics-react-native";
import { useCallback } from "react";
import * as Application from "expo-application";

export const useAmplitude = () => {
  const appVersion = Application.nativeApplicationVersion;
  const appOpen = useCallback(() => {
    logEvent({
      event_type: "open-app",
      app_version: appVersion,
    });
  }, []);

  const bmc = useCallback(() => {
    logEvent({
      event_type: "bmc-click",
    });
  }, []);

  const gameStarted = useCallback((gameId: string, timeout: number) => {
    const eventProperties = {
      gameId,
      timeout,
    };
    track("Game Started", eventProperties);
  }, []);

  const gameEnd = useCallback(
    (gameId: string, pass: number, correct: number) => {
      const eventProperties = {
        gameId,
        pass,
        correct,
      };
      track("Game End", eventProperties);
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
