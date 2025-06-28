import { customEvent } from "vexo-analytics";
import { useCallback } from "react";
import * as Application from "expo-application";

export const useVexo = () => {
  const appVersion = Application.nativeApplicationVersion;
  const appOpen = useCallback(() => {
    customEvent("open-app", {
      app_version: appVersion,
    });
  }, []);

  const bmc = useCallback(() => {
    customEvent("bmc-click", {});
  }, []);

  const gameStarted = useCallback((gameId: string, timeout: number) => {
    const eventProperties = {
      gameId,
      timeout,
    };
    customEvent("Game Started", eventProperties);
  }, []);

  const gameEnd = useCallback(
    (gameId: string, pass: number, correct: number) => {
      const eventProperties = {
        gameId,
        pass,
        correct,
      };
      customEvent("Game End", eventProperties);
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
