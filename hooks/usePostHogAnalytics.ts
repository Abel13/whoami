import { useCallback } from "react";
import * as Application from "expo-application";
import { usePostHog } from "posthog-react-native";

export const usePostHogAnalytics = () => {
  const posthog = usePostHog();

  const appVersion = Application.nativeApplicationVersion;
  const appOpen = useCallback(async () => {
    posthog.capture("open-app", {
      app_version: appVersion,
    });
  }, []);

  const bmc = useCallback(async () => {
    posthog.capture("bmc-click", {});
  }, []);

  const gameStarted = useCallback(async (gameId: string, timeout: number) => {
    const eventProperties = {
      gameId,
      timeout,
    };

    posthog.capture("Game Started", eventProperties);
  }, []);

  const gameEnd = useCallback(
    async (gameId: string, pass: number, correct: number) => {
      const eventProperties = {
        gameId,
        pass,
        correct,
      };
      posthog.capture("Game End", eventProperties);
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
