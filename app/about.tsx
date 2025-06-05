import { useAmplitude } from "@/hooks/useAmplitude";
import { Feather } from "@expo/vector-icons";
import { nativeApplicationVersion } from "expo-application";
import { router } from "expo-router";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AboutScreen() {
  const { bmc } = useAmplitude();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable style={{ padding: 10 }} onPress={router.back}>
          <Feather name="chevron-left" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.title}>Sobre</Text>
      </View>
      <View style={styles.card}>
        <ScrollView>
          <View style={styles.scrollContent}>
            <View style={styles.imageContainer}>
              <Image
                style={{
                  borderRadius: 10,
                  width: 100,
                  height: 100,
                }}
                source={require("@/assets/images/icon.png")}
                width={100}
                height={100}
                resizeMode="cover"
              />
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Quem sou eu?</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Versão:</Text>
              <Text style={styles.itemValue}>{nativeApplicationVersion}</Text>
            </View>
            <View />
            <View />
            <Text style={styles.itemValue}>
              Apoie meu trabalho com um café ☕ (opcional)
            </Text>
            <Pressable
              onPress={() => {
                bmc();
                Linking.openURL("https://www.buymeacoffee.com/abeldutraui");
              }}
            >
              <Image
                source={{
                  uri: "https://cdn.buymeacoffee.com/buttons/v2/default-blue.png",
                }}
                style={{ width: 125, height: 40 }}
                width={145}
                resizeMode="contain"
              />
            </Pressable>
            <View />
            <View />
            <View style={styles.itemContainer}>
              <Text style={styles.itemValue}>{"contact@abeldutraui.me"}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemValue}>{"Copyright © 2025"}</Text>
            </View>
          </View>
        </ScrollView>
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
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 10,
    gap: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  scrollContent: { alignItems: "center", gap: 5, margin: 10 },
  imageContainer: {
    shadowColor: "#707070",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  titleContainer: {
    width: "100%",
    maxWidth: 360,
    flexDirection: "row",
    gap: 20,
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
  label: {
    fontSize: 16,
    color: "#444",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    gap: 10,
  },
  itemTitle: {
    color: "#3478f6",
    fontFamily: "Montserrat",
    fontWeight: 600,
    fontSize: 12,
  },
  itemValue: {
    color: "#a1a1a1",
    fontFamily: "Montserrat",
    fontSize: 12,
  },
});
