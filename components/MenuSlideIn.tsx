// components/MenuSlideIn.tsx
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function MenuSlideIn() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-130)).current;
  const router = useRouter();

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? -130 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuVisible(!menuVisible);
  };

  return (
    <Animated.View style={[styles.menuContainer, { left: menuAnimation }]}>
      <View style={[styles.menu, styles.row]}>
        <View style={styles.row}>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              router.push("/settings");
              toggleMenu();
            }}
          >
            <Feather name="settings" size={24} color={"#FFF"} />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              router.push("/history");
              toggleMenu();
            }}
          >
            <Feather name="list" size={24} color={"#FFF"} />
          </Pressable>
          <Pressable
            style={styles.pressable}
            onPress={() => {
              router.push("/about");
              toggleMenu();
            }}
          >
            <Feather name="info" size={24} color={"#FFF"} />
          </Pressable>
        </View>
        <Pressable style={styles.pressable} onPress={toggleMenu}>
          <Feather
            name={menuVisible ? "chevron-left" : "chevron-right"}
            size={24}
            color={"#FFF"}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 5,
    zIndex: 1000,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  pressable: {
    padding: 10,
    paddingInline: 2,
  },
  menu: {
    alignItems: "center",
    backgroundColor: "#095040cc",
    paddingHorizontal: 10,
    paddingLeft: 30,
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    gap: 30,
  },
});
