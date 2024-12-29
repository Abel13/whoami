import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Vibration,
  Pressable,
} from "react-native";
import { Gyroscope, GyroscopeMeasurement } from "expo-sensors";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categories, useCategoryOptions } from "../hooks/useCategoryOptions";
import { useKeepAwake } from "expo-keep-awake";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import { Feather } from "@expo/vector-icons";

export default function GameScreen() {
  const { category } = useLocalSearchParams();
  const {
    gameDuration,
    soundEnabled,
    vibrationEnabled,
    touchEnabled,
    gyroscopeEnabled,
  } = useSettingsStore((state) => state);
  const router = useRouter();

  useKeepAwake();

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
    category as keyof typeof categories
  );

  useEffect(() => {
    if (preCountdown === 3) handleSound("start");
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
        params: { passedWords: JSON.stringify(passedWords) },
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
    if (timeLeft === 0) handleVibration();
  }, [timeLeft]);

  useEffect(() => {
    resetRound();
  }, []);

  const handleSound = async (type: "pass" | "correct" | "start") => {
    if (!soundEnabled) return;

    let file;
    switch (type) {
      case "pass":
        file = require("../assets/sounds/pass.mp3");
        break;
      case "correct":
        file = require("../assets/sounds/correct.mp3");
        break;
      default:
        file = require("../assets/sounds/start.wav");
        break;
    }

    const sound = await Audio.Sound.createAsync(file);
    await sound.sound.playAsync();
  };

  const handleVibration = () => {
    if (vibrationEnabled) Vibration.vibrate(200);
  };

  const handleNextWord = async (action: "pass" | "correct") => {
    const now = Date.now();
    if (now - lastAction < 500) return;
    setLastAction(now);

    await handleSound(action);
    setPassedWords((prev) => [...prev, { word: currentWord!, status: action }]);

    if (action === "correct") {
      setCorrectCount((prev) => prev + 1);
    } else if (action === "pass") {
      setPassCount((prev) => prev + 1);
    }

    const nextWord = getNextOption();
    setCurrentWord(nextWord);
  };

  const handleEndGame = () => {
    setShouldNavigate(true);
  };

  return (
    <View style={styles.container}>
      {preCountdown > 0 ? (
        <Text style={styles.preTimer}>
          Prepare-se, o jogo começa em: {preCountdown}s
        </Text>
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
                <Text style={styles.timer}>
                  {timeLeft
                    .toString()
                    .padStart(gameDuration.toString().length, "0")}
                </Text>
              </View>
              <View style={styles.counters}>
                <Text style={styles.counter}>Correto: {correctCount}</Text>
                <Text style={styles.counter}>Passou: {passCount}</Text>
              </View>
              <Pressable onPress={handleEndGame}>
                <Feather name="pause" size={35} color={"#FFF"} />
              </Pressable>
            </View>

            <View style={styles.wordContainer}>
              <Text style={styles.word}>
                {currentWord || "Acabou minha criatividade"}
              </Text>
            </View>
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
    backgroundColor: "#060",
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
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#e32",
    paddingHorizontal: 50,
    paddingVertical: 20,
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
  timer: {
    fontSize: 24,
  },
  wordContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFF",
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
