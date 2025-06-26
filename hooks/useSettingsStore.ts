import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SettingsState {
  gameDuration: number;
  gameDifficulty: number | null;
  maxAge: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  gyroscopeEnabled: boolean;
  touchEnabled: boolean;
  setGameDuration: (duration: number) => void;
  setGameDifficulty: (difficulty: number) => void;
  toggleSound: () => void;
  toggleVibration: () => void;
  toggleGyroscope: () => void;
  toggleTouch: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      gameDuration: 60,
      gameDifficulty: null,
      maxAge: 0,
      soundEnabled: true,
      vibrationEnabled: true,
      gyroscopeEnabled: true,
      touchEnabled: true,
      setGameDuration: (duration) =>
        set(() => ({
          gameDuration: duration,
        })),
      setGameDifficulty(difficulty) {
        set(() => ({
          gameDifficulty: difficulty,
        }));
      },
      toggleSound: () =>
        set((state) => ({
          soundEnabled: !state.soundEnabled,
        })),
      toggleVibration: () =>
        set((state) => ({
          vibrationEnabled: !state.vibrationEnabled,
        })),
      toggleGyroscope: () =>
        set((state) => ({
          gyroscopeEnabled: state.touchEnabled
            ? !state.gyroscopeEnabled
            : state.gyroscopeEnabled,
        })),
      toggleTouch: () =>
        set((state) => ({
          touchEnabled: state.gyroscopeEnabled
            ? !state.touchEnabled
            : state.touchEnabled,
        })),
    }),
    {
      name: "settings-storage", // Nome da chave no armazenamento
      partialize: (state) => ({
        // Define quais campos devem ser persistidos
        gameDuration: state.gameDuration,
        gameDifficulty: state.gameDifficulty,
        soundEnabled: state.soundEnabled,
        vibrationEnabled: state.vibrationEnabled,
        gyroscopeEnabled: state.gyroscopeEnabled,
        touchEnabled: state.touchEnabled,
      }),
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
