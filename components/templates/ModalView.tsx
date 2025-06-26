import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function ModalView({
  children,
  title = "Title",
  onClose = null,
}) {
  const router = useRouter();

  return (
    <BlurView intensity={80} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          style={{ padding: 10, paddingHorizontal: 15 }}
          onPress={onClose ? onClose : router.back}
        >
          <Feather name="x" size={24} color="#FFF" />
        </Pressable>
      </View>
      <View style={styles.card}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 360,
    elevation: 10,
    gap: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  titleContainer: {
    width: "100%",
    maxWidth: 360,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    backgroundColor: "#3478f6",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat",
    color: "#FFF",
  },
});
