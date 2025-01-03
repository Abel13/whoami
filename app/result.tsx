import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ResultScreen() {
  const { passedWords } = useLocalSearchParams();
  const results = JSON.parse(passedWords as string);

  const router = useRouter();

  // Calcula estatísticas
  const totalWords = results.length;
  const correctWords = results.filter(
    (item) => item.status === "correct"
  ).length;
  const passedWordsCount = results.filter(
    (item) => item.status === "pass"
  ).length;
  const correctPercentage = ((correctWords / totalWords) * 100).toFixed(1);
  const passPercentage = ((passedWordsCount / totalWords) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <View>
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
        <Pressable style={styles.buttonContainer} onPress={router.back}>
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
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
    paddingHorizontal: 50,
    flexDirection: "row",
    gap: 30,
    backgroundColor: "#123",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  statCard: {
    width: 120,
    height: 120,
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
  },
  title: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  statTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  statNumber: { fontSize: 28, fontWeight: "bold" },
  statPercentage: { fontSize: 18, fontWeight: "600", color: "#555" },
  item: { fontSize: 14, marginVertical: 5 },
  pass: { color: "orange", opacity: 0.6 },
  correct: { color: "green", fontWeight: "bold" },
});
