import React, { useState, useEffect, useId } from "react";
import { router, usePathname, useGlobalSearchParams, Slot } from "expo-router";
import { View, Text, StyleSheet, Vibration, Pressable } from "react-native";
import { Gyroscope, GyroscopeMeasurement } from "expo-sensors";
import { useCategoryOptions } from "../hooks/useCategoryOptions";
import { useKeepAwake } from "expo-keep-awake";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { Feather } from "@expo/vector-icons";
import { Timer } from "@/components/Timer";
import { WordCard } from "@/components/Card";
import { useAudioConfig, useSound } from "@/hooks/useAudioConfig";
import { useCardAnimation } from "@/hooks/useCardAnimation";
import { useAmplitude } from "@/hooks/useAmplitude";
import { useVexo } from "@/hooks/useVexo";
import { useAptabase } from "@/hooks/useAptabase";

export default function GameScreen() {
  const params = useGlobalSearchParams();

  const category: string = params.category as string;
  const {
    gameDuration,
    gameDifficulty,
    soundEnabled,
    vibrationEnabled,
    touchEnabled,
    gyroscopeEnabled,
  } = useSettingsStore((state) => state);

  const { animateCard, getCardStyle, currentCardColor } = useCardAnimation();
  const { gameStarted: gsAmplitude } = useAmplitude();
  const { gameStarted: gsAptabase } = useAptabase();
  const { gameStarted: gsVexo } = useVexo();

  useAudioConfig();
  useKeepAwake();
  const playSound = useSound(soundEnabled);

  const [preCountdown, setPreCountdown] = useState(5);
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<number>(0);
  const [gyroscopeData, setGyroscopeData] =
    useState<GyroscopeMeasurement | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [passCount, setPassCount] = useState(0);
  const [passedWords, setPassedWords] = useState<
    { word: string; status: string }[]
  >([]);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { getNextOption, resetRound } = useCategoryOptions(
    category,
    ["easy", "medium", "hard"][gameDifficulty]
  );

  useEffect(() => {
    if (preCountdown === 3) playSound("start");
    if (preCountdown > 0) {
      const preTimer = setInterval(() => {
        setPreCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(preTimer);
    } else {
      const firstWord = getNextOption();
      if (firstWord) setCurrentWord(firstWord);
    }
  }, [preCountdown]);

  useEffect(() => {
    if (preCountdown === 0 && gyroscopeEnabled) {
      const subscription = Gyroscope.addListener((data) => {
        setGyroscopeData(data);
      });
      Gyroscope.setUpdateInterval(50);

      return () => subscription.remove();
    }
  }, [preCountdown]);

  useEffect(() => {
    if (gyroscopeData && preCountdown === 0 && timeLeft > 0) {
      const { y } = gyroscopeData;

      if (y > 4) {
        handleNextWord("correct");
      } else if (y < -4) {
        handleNextWord("pass");
      }
    }
  }, [gyroscopeData]);

  useEffect(() => {
    if (shouldNavigate) {
      router.dismissTo({
        pathname: "/result",
        params: {
          words: JSON.stringify(passedWords),
          category,
        },
      });
    }
  }, [shouldNavigate]);

  useEffect(() => {
    if (preCountdown === 0) {
      const gameTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(gameTimer);
            setShouldNavigate(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(gameTimer);
    }
  }, [preCountdown]);

  useEffect(() => {
    if (gameDuration) {
      gsAmplitude(category, gameDuration);
      gsVexo(category, gameDuration);
      gsAptabase(category, gameDuration);
    }
  }, [gameDuration]);

  useEffect(() => {
    if (timeLeft === 0) handleVibration();
  }, [timeLeft]);

  useEffect(() => {
    resetRound();
  }, []);

  const handleVibration = () => {
    if (vibrationEnabled) Vibration.vibrate(200);
  };

  const handleNextWord = async (action: "pass" | "correct") => {
    const now = Date.now();
    if (now - lastAction < 500) return;
    setLastAction(now);

    const direction = action === "correct" ? "up" : "down";

    await playSound(action);
    setPassedWords((prev) => [...prev, { word: currentWord!, status: action }]);

    if (action === "correct") {
      setCorrectCount((prev) => prev + 1);
    } else if (action === "pass") {
      setPassCount((prev) => prev + 1);
    }

    animateCard(direction, () => {
      const nextWord = getNextOption();
      setCurrentWord(nextWord || "Game Over");
    });
  };

  const handleEndGame = () => {
    setShouldNavigate(true);
  };

  return (
    <View style={styles.container}>
      {preCountdown > 0 ? (
        <View style={styles.preTimer}>
          <Timer timeLeft={preCountdown} />
        </View>
      ) : (
        <View style={styles.container}>
          {touchEnabled && (
            <View style={styles.screenButton}>
              <Pressable
                style={{ flex: 1 }}
                onPress={() => handleNextWord("correct")}
              />
              <Pressable
                style={{ flex: 1 }}
                onPress={() => handleNextWord("pass")}
              />
            </View>
          )}
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.timerContainer}>
                <Timer timeLeft={timeLeft} />
              </View>
              <View style={styles.counters}>
                <Text style={styles.counter}>
                  Correta: {correctCount.toString().padStart(2, "0")}
                </Text>
                <Text style={styles.counter}>
                  Passa: {passCount.toString().padStart(2, "0")}
                </Text>
              </View>
              <Pressable onPress={handleEndGame}>
                <Feather name="pause" size={35} color={"#FFF"} />
              </Pressable>
            </View>

            <WordCard
              backgroundColor={currentCardColor}
              word={currentWord}
              style={getCardStyle()}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#a33",
  },
  screenButton: {
    position: "absolute",
    flex: 1,
    top: 80,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    zIndex: 1000,
  },
  preTimer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 30,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timerContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#FFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  counters: {
    flexDirection: "row",
    gap: 20,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 10,
    padding: 10,
  },
  counter: {
    fontSize: 25,
    color: "#FFF",
  },
});
