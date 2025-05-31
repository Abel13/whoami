import { track } from "@amplitude/analytics-react-native";
import { useCallback } from "react";

export const useAmplitude = () => {
  const gameStarted = useCallback((gameId: string) => {
    const eventProperties = {
      gameId,
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
  };
};
