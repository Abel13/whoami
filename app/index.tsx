import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { categories } from "../hooks/useCategoryOptions";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native-gesture-handler";

export default function HomeScreen() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");

  // Função para agrupar itens em pares
  const groupItems = (data) => {
    const grouped = [];
    for (let i = 0; i < data.length; i += 2) {
      grouped.push(data.slice(i, i + 2));
    }
    return grouped;
  };

  const groupedCategories = groupItems(Object.keys(categories));

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <View style={styles.menu}>
          <Pressable onPress={() => router.push("/settings")}>
            <Feather name="settings" size={24} color={"#FFF"} />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={groupedCategories}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.map((subItem, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  { width: width * 0.4, height: height * 0.5 },
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/game",
                    params: { category: subItem },
                  })
                }
              >
                <Text style={styles.buttonText}>{subItem}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        keyExtractor={(_, index) => `group-${index}`}
        horizontal // Habilita o scroll horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 1,
    marginHorizontal: 1,
    backgroundColor: "#0a7ea4",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  menu: {
    backgroundColor: "#00000033",
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
    padding: 10,
    borderBottomEndRadius: 10,
  },
});
