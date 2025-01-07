import { useRef, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";

export const useCardAnimation = () => {
  const { height } = useWindowDimensions();
  const animation = useRef(new Animated.Value(0)).current;
  const [direction, setDirection] = useState<number>(-height);
  const [currentCardColor, setCurrentCardColor] = useState(
    getRandomDarkColor()
  );

  const animateCard = (direction: "up" | "down", onComplete: () => void) => {
    setDirection(direction === "up" ? -height : height);

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentCardColor(getRandomDarkColor());
      onComplete();
    });
  };

  const getCardStyle = () => ({
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, direction],
        }),
      },
    ],
    backgroundColor: currentCardColor,
  });

  return {
    currentCardColor,
    animateCard,
    getCardStyle,
  };
};

const getRandomDarkColor = () => {
  const randomValue = () => Math.floor(Math.random() * 128);
  return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
};
