import React from "react";
import { router } from "expo-router";

import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { categories, CategoryOptions } from "../hooks/useCategoryOptions";
import { MenuSlideIn } from "@/components/MenuSlideIn";
import { Image } from "expo-image";
import { useAmplitude } from "@/hooks/useAmplitude";

export default function HomeScreen() {
  const { height } = Dimensions.get("window");
  const { gameStarted } = useAmplitude();
  const groupItems = (data) => {
    const grouped: CategoryOptions[][] = [];
    for (let i = 0; i < data.length; i += 3) {
      grouped.push(data.slice(i, i + 3));
    }
    return grouped;
  };

  const groupedCategories = groupItems(categories);

  return (
    <View style={styles.container}>
      <MenuSlideIn />
      <FlatList
        data={groupedCategories}
        renderItem={({ item }) => (
          <View style={styles.column}>
            {item.map((subItem) => (
              <TouchableOpacity
                key={subItem.key}
                style={[
                  styles.button,
                  {
                    width: height / 3,
                    height: height * 0.35,
                    backgroundColor: subItem.background,
                  },
                ]}
                onPress={() => {
                  if (subItem.items.length > 0) {
                    gameStarted(subItem.key);
                    router.navigate({
                      pathname: "game",
                      params: { category: subItem.key },
                    });
                  }
                }}
              >
                {subItem.items.length === 0 && (
                  <View style={styles.soonContainer}>
                    <Text style={styles.soonText}>EM BREVE</Text>
                  </View>
                )}
                <Image
                  source={subItem.image}
                  style={{ width: 70, height: 70 }}
                />
                <Text style={styles.buttonText}>{subItem.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        keyExtractor={(_, index) => `group-${index}`}
        horizontal
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
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Montserrat",
    fontWeight: 600,
    textShadowColor: "#555",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  soonContainer: {
    backgroundColor: "#f44",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-end",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  soonText: { fontSize: 8, fontWeight: 600, color: "#fcc" },
});
