import { create } from "zustand";

interface SettingsState {
  gameDuration: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  gyroscopeEnabled: boolean;
  touchEnabled: boolean;
  setGameDuration: (duration: number) => void;
  toggleSound: () => void;
  toggleVibration: () => void;
  toggleGyroscope: () => void;
  toggleTouch: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  gameDuration: 60,
  soundEnabled: true,
  vibrationEnabled: true,
  gyroscopeEnabled: true,
  touchEnabled: true,
  setGameDuration: (duration) =>
    set(() => ({
      gameDuration: duration,
    })),
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
}));
