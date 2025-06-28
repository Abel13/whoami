import React from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { useSettingsStore } from "../hooks/useSettingsStore";
import Slider from "@react-native-community/slider";
import ModalView from "@/components/templates/ModalView";
import { SectionView } from "@/components/Section";
import { DifficultyCard } from "@/components/molecules/DifficultyCard";
import { difficulties } from "@/components/organisms/DifficultySelector";

// classificação
// Fácil, Média, Difícil
// Fácil: recomendado para crianças, definir idade máxima
// Média: recomendado para o público em geral
// Difícil: recomendado para público específico, pode contar itens direcionados a especialistas

export default function SettingsScreen() {
  const {
    gameDuration,
    gameDifficulty,
    setGameDifficulty,
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

  const difficulty = ["easy", "medium", "hard"][gameDifficulty];

  return (
    <ModalView title="Configurações">
      <ScrollView
        style={{ paddingHorizontal: 20, paddingBlock: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 20, marginBottom: 30 }}>
          <SectionView title="jogo">
            <View style={styles.optionContainer}>
              <Text style={styles.label}>⏱ Tempo de Jogo:</Text>
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
              <Text style={styles.value}>{gameDuration} segundos</Text>
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.label}>🧠 Dificuldade</Text>
              <DifficultyCard
                key={difficulty}
                image={difficulties[difficulty].image}
                title={difficulties[difficulty].title}
                message={difficulties[difficulty].message}
                primaryColor="#fff"
                secondaryColor={difficulties[difficulty].secondaryColor}
              />
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2}
                step={1}
                value={gameDifficulty}
                onValueChange={setGameDifficulty}
                minimumTrackTintColor="#f5a623"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#f5a623"
              />
              <Text style={styles.value}>{difficulties[difficulty].title}</Text>
            </View>
          </SectionView>

          <SectionView title="hardware">
            <View style={[styles.option, styles.optionContainer]}>
              <Text style={styles.label}>🔊 Som</Text>
              <Switch
                value={soundEnabled}
                onValueChange={toggleSound}
                trackColor={{ true: "#f5a623", false: "#ccc" }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.option, styles.optionContainer]}>
              <Text style={styles.label}>📳 Vibração</Text>
              <Switch
                value={vibrationEnabled}
                onValueChange={toggleVibration}
                trackColor={{ true: "#f5a623", false: "#ccc" }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.option, styles.optionContainer]}>
              <Text style={styles.label}>🧭 Giroscópio</Text>
              <Switch
                value={gyroscopeEnabled}
                onValueChange={toggleGyroscope}
                trackColor={{ true: "#f5a623", false: "#ccc" }}
                thumbColor="#fff"
              />
            </View>

            <View style={[styles.option, styles.optionContainer]}>
              <Text style={styles.label}>👆 Toque</Text>
              <Switch
                value={touchEnabled}
                onValueChange={toggleTouch}
                trackColor={{ true: "#f5a623", false: "#ccc" }}
                thumbColor="#fff"
              />
            </View>
          </SectionView>
        </View>
      </ScrollView>
    </ModalView>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#3478f6",
    borderRadius: 8,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  value: {
    textAlign: "right",
    fontSize: 12,
    color: "#777",
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
