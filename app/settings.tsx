import React from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useSettingsStore } from "../hooks/useSettingsStore";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { Feather, Ionicons } from "@expo/vector-icons";

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
      <View style={styles.titleContainer}>
        <Pressable onPress={router.back}>
          <Feather name="chevron-left" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.title}>Configurações</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.option}>
          <Text style={styles.label}>🔊 Som</Text>
          <Switch
            value={soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ true: "#f5a623", false: "#ccc" }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.label}>📳 Vibração</Text>
          <Switch
            value={vibrationEnabled}
            onValueChange={toggleVibration}
            trackColor={{ true: "#f5a623", false: "#ccc" }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.label}>🧭 Giroscópio</Text>
          <Switch
            value={gyroscopeEnabled}
            onValueChange={toggleGyroscope}
            trackColor={{ true: "#f5a623", false: "#ccc" }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.option}>
          <Text style={styles.label}>👆 Toque</Text>
          <Switch
            value={touchEnabled}
            onValueChange={toggleTouch}
            trackColor={{ true: "#f5a623", false: "#ccc" }}
            thumbColor="#fff"
          />
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>
            ⏱ Tempo de Jogo: {gameDuration} segundos
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={30}
            maximumValue={300}
            step={10}
            value={gameDuration}
            onValueChange={setGameDuration}
            minimumTrackTintColor="#f5a623"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#f5a623"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d0ebff55",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 10,
    gap: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  titleContainer: {
    width: "100%",
    maxWidth: 360,
    flexDirection: "row",
    padding: 10,
    gap: 20,
    backgroundColor: "#3478f6",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat",
    color: "#FFF",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
