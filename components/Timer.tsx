import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Timer = ({ timeLeft }: { timeLeft: number }) => (
  <View style={styles.timerContainer}>
    <Text style={styles.timer}>{timeLeft}</Text>
  </View>
);

const styles = StyleSheet.create({
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
});
