import React, { useEffect, useId } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useHistoryStore } from "@/hooks/useHistoryStore";
import { Feather } from "@expo/vector-icons";
import { useAmplitude } from "@/hooks/useAmplitude";

export default function ResultScreen() {
  const params = useGlobalSearchParams();
  const { gameEnd } = useAmplitude();
  const {
    words,
    category,
    id,
  }: { words: string; category: string; id?: string } = params;

  const newId = useId();

  const { saveGame } = useHistoryStore((state) => state);
  const results = JSON.parse(words as string);

  const router = useRouter();

  const totalWords = results.length;
  const correctWords = results.filter(
    (item) => item.status === "correct"
  ).length;
  const passedWordsCount = results.filter(
    (item) => item.status === "pass"
  ).length;
  const correctPercentage = ((correctWords / totalWords) * 100 || 0).toFixed(0);
  const passPercentage = ((passedWordsCount / totalWords) * 100 || 0).toFixed(
    0
  );

  useEffect(() => {
    if (words?.length > 0 && !id) {
      gameEnd(category, passedWordsCount, correctWords);
      saveGame({
        id: newId,
        category: category as string,
        correctWords: correctWords,
        passedWords: passedWordsCount,
        date: new Date(),
        words: results.map((item) => item),
      });
    }
  }, [words]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={router.back}>
          <Feather name="chevron-left" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.title}>Resultado</Text>
      </View>
      <View style={styles.card}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: "#d4edda" }]}>
              <Text style={styles.statTitle}>Acertos</Text>
              <Text style={styles.statNumber}>{correctWords}</Text>
              <Text style={styles.statPercentage}>{correctPercentage}%</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: "#f8d7da" }]}>
              <Text style={styles.statTitle}>Passadas</Text>
              <Text style={styles.statNumber}>{passedWordsCount}</Text>
              <Text style={styles.statPercentage}>{passPercentage}%</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={results}
          ListHeaderComponent={() => {
            return (
              <View>
                <Text style={styles.title}>Histórico</Text>
              </View>
            );
          }}
          renderItem={({ item }) => (
            <Text style={[styles.item, styles[item.status]]}>{item.word}</Text>
          )}
          ListFooterComponent={() => {
            return <View style={{ height: 50 }} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#d0ebff55",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 10,
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    gap: 20,
  },
  statCard: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
  },
  statTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  statNumber: { fontSize: 28, fontWeight: "bold" },
  statPercentage: { fontSize: 18, fontWeight: "600", color: "#555" },
  item: { fontSize: 14, marginVertical: 5 },
  pass: { color: "orange", opacity: 0.6 },
  correct: { color: "green", fontWeight: "bold" },
});
