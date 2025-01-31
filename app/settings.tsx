import React from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  const {
    gameDuration,
    setGameDuration,
    soundEnabled,
    toggleSound,
    vibrationEnabled,
    toggleVibration,
    gyroscopeEnabled,
    toggleGyroscope,
    toggleTouch,
    touchEnabled,
  } = useSettingsStore((state) => state);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={{ alignItems: "center", gap: 20 }}>
        <View style={styles.content}>
          <View style={styles.setting}>
            <Text style={styles.label}>Som</Text>
            <Switch value={soundEnabled} onValueChange={toggleSound} />
          </View>

          <View style={styles.setting}>
            <Text style={styles.label}>Vibração</Text>
            <Switch value={vibrationEnabled} onValueChange={toggleVibration} />
          </View>

          <View style={styles.setting}>
            <Text style={styles.label}>Giroscópio</Text>
            <Switch value={gyroscopeEnabled} onValueChange={toggleGyroscope} />
          </View>

          <View style={styles.setting}>
            <Text style={styles.label}>Toque</Text>
            <Switch value={touchEnabled} onValueChange={toggleTouch} />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.setting}>
            <Text style={styles.label}>
              Tempo de Duração do Jogo: {gameDuration} segundos
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={30}
              maximumValue={300}
              step={30}
              value={gameDuration}
              onValueChange={(value) => setGameDuration(value)}
            />
          </View>
        </View>
        <View />
        <Pressable style={styles.buttonContainer} onPress={router.back}>
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 50,
    backgroundColor: "#123",
    gap: 20,
  },
  content: {
    flexDirection: "row",
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  setting: {},
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#FFF",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  buttonContainer: {
    height: 50,
    width: 200,
    backgroundColor: "#0a7ea4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
