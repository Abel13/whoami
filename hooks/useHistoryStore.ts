import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Game {
  id: string;
  category: string;
  words: { status: "correct" | "pass"; word: string }[];
  date: Date;
  correctWords: number;
  passedWords: number;
}

interface HistoryStore {
  gamesHistory: Game[];
  saveGame: (game: Game) => void;
  deleteGame: (game: Game) => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      gamesHistory: [],
      saveGame: (game) => {
        set((state) => ({
          gamesHistory: [...state.gamesHistory, { ...game, date: new Date() }],
        }));
      },
      deleteGame: (game) => {
        set((state) => ({
          gamesHistory: state.gamesHistory.filter((g) => g.id !== game.id),
        }));
      },
    }),
    {
      name: "history-storage",
      partialize: (state) => ({
        gamesHistory: state.gamesHistory,
      }),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
