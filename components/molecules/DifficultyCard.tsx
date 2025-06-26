import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export const DifficultyCard = ({
  title,
  message,
  primaryColor = "#90EE90",
  secondaryColor = "#446644",
  next = false,
  prev = false,
  image,
}) => {
  const leftAnim = useSharedValue(0);
  const rightAnim = useSharedValue(0);

  useEffect(() => {
    if (prev) {
      leftAnim.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        true
      );
    }
    if (next) {
      rightAnim.value = withRepeat(
        withSequence(
          withTiming(5, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        true
      );
    }
  }, []);

  const animatedLeft = useAnimatedStyle(() => ({
    transform: [{ translateX: leftAnim.value }],
  }));

  const animatedRight = useAnimatedStyle(() => ({
    transform: [{ translateX: rightAnim.value }],
  }));

  return (
    <View
      style={[
        styles.page,
        {
          alignSelf: "center",
          backgroundColor: primaryColor,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: secondaryColor }]}>{title}</Text>
        <View style={styles.navRow}>
          {prev ? (
            <View>
              <Text style={{ color: secondaryColor, fontSize: 12 }}>
                arraste
              </Text>
              <Animated.View style={animatedLeft}>
                <Feather
                  name="chevrons-right"
                  size={20}
                  color={secondaryColor}
                />
              </Animated.View>
            </View>
          ) : (
            <Feather name="chevrons-right" size={20} color="transparent" />
          )}
          <Image source={image} style={{ height: 100, width: 100 }} />

          {next ? (
            <View>
              <Text style={{ color: secondaryColor, fontSize: 12 }}>
                arraste
              </Text>
              <Animated.View style={animatedRight}>
                <Feather
                  name="chevrons-left"
                  size={20}
                  color={secondaryColor}
                />
              </Animated.View>
            </View>
          ) : (
            <Feather name="chevrons-left" size={20} color="transparent" />
          )}
        </View>

        <Text style={[styles.message, { backgroundColor: secondaryColor }]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 10,
    gap: 15,
  },
  content: {
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  message: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    padding: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  navRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
