import React, { useEffect, useId } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useHistoryStore } from "@/hooks/useHistoryStore";
import { Feather } from "@expo/vector-icons";
import { useAmplitude } from "@/hooks/useAmplitude";
import { useVexo } from "@/hooks/useVexo";
import { useAptabase } from "@/hooks/useAptabase";
import { usePostHogAnalytics } from "@/hooks/usePostHogAnalytics";
import ModalView from "@/components/templates/ModalView";

export default function ResultScreen() {
  const params = useGlobalSearchParams();
  const { gameEnd: geAmplitude } = useAmplitude();
  const { gameEnd: geAptabase } = useAptabase();
  const { gameEnd: gePostHog } = usePostHogAnalytics();
  const { gameEnd: geVexo } = useVexo();

  const {
    words,
    category,
    id,
  }: { words: string; category: string; id?: string } = params as any;

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
      geAmplitude(category, passedWordsCount, correctWords);
      geVexo(category, passedWordsCount, correctWords);
      geAptabase(category, passedWordsCount, correctWords);
      gePostHog(category, passedWordsCount, correctWords);
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
    <ModalView title="Resultado">
      <View style={{ flex: 1 }}>
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
        <Text style={styles.title}>Histórico</Text>
        <FlatList
          data={results}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Text style={[styles.item, styles[item.status]]}>{item.word}</Text>
          )}
          ListFooterComponent={() => {
            return <View style={{ height: 30 }} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ModalView>
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
    fontSize: 16,
    fontWeight: "600",
    paddingInline: 10,
    fontFamily: "Montserrat",
    color: "#a1a1a1",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
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
  item: {
    flex: 1,
    paddingInline: 5,
    paddingVertical: 5,
    marginInline: 10,
    marginVertical: 2,
    borderBottomWidth: 1,
    borderRadius: 5,
    borderColor: "#e1e1e1",
  },
  pass: { color: "#f75360", fontWeight: 500 },
  correct: { color: "green", fontWeight: "bold" },
});
