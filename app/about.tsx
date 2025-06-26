import ModalView from "@/components/templates/ModalView";
import { useAmplitude } from "@/hooks/useAmplitude";
import { useAptabase } from "@/hooks/useAptabase";
import { usePostHogAnalytics } from "@/hooks/usePostHogAnalytics";
import { useVexo } from "@/hooks/useVexo";
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
  const { bmc: bmcAmplitude } = useAmplitude();
  const { bmc: bmcAptabase } = useAptabase();
  const { bmc: bmcPostHog } = usePostHogAnalytics();
  const { bmc: bmcVexo } = useVexo();

  return (
    <ModalView title="Sobre">
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
              bmcAmplitude();
              bmcVexo();
              bmcAptabase();
              bmcPostHog();
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
    </ModalView>
  );
}

const styles = StyleSheet.create({
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
