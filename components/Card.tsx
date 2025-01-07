import React from "react";
import { Animated, Text, StyleSheet } from "react-native";

export const WordCard = ({
  word,
  style,
  backgroundColor,
}: {
  word: string;
  style: any;
  backgroundColor: string;
}) => (
  <Animated.View style={[styles.card, style, { backgroundColor }]}>
    <Text style={styles.word}>{word}</Text>
  </Animated.View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  word: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FFF",
  },
});
