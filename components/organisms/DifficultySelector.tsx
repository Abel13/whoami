import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { usePagerView } from "react-native-pager-view";
import { DifficultyCard } from "../molecules/DifficultyCard";
import { BlurView } from "expo-blur";
import { useState } from "react";

export const difficulties: {
  [key: string]: {
    image: any;
    title: string;
    message: string;
    next: boolean;
    prev: boolean;
    primaryColor: string;
    secondaryColor: string;
  };
} = {
  easy: {
    image: require("@/assets/images/settings/easy.png"),
    title: "Fácil",
    message: "Ideal para crianças! Recomendado até 12 anos de idade.",
    next: true,
    prev: false,
    primaryColor: "#90EE90",
    secondaryColor: "#446644",
  },
  medium: {
    next: true,
    prev: true,
    title: "Média",
    image: require("@/assets/images/settings/medium.png"),
    message: "Indicado para o público em geral. Desafios equilibrados.",
    primaryColor: "#eeeb90",
    secondaryColor: "#665d44",
  },
  hard: {
    prev: true,
    next: false,
    title: "Difícil",
    image: require("@/assets/images/settings/hard.png"),
    message:
      "Voltado para usuários experientes. Pode conter elementos mais complexos, específicos ou técnicos.",
    primaryColor: "#ee9090",
    secondaryColor: "#664444",
  },
};

export const DifficultySelector = ({ visible = false, onSelect }) => {
  const { AnimatedPagerView, ref, ...rest } = usePagerView({ pagesAmount: 3 });
  const [position, setPosition] = useState<number>(0);

  const handlePageSelected = (
    event: NativeSyntheticEvent<Readonly<{ position: number }>>
  ) => {
    const position = event.nativeEvent.position;
    setPosition(position);
  };

  if (!visible) return null;

  return (
    <View
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        zIndex: 2000,
      }}
    >
      <BlurView
        tint="systemChromeMaterial"
        intensity={100}
        style={StyleSheet.absoluteFill}
      >
        <Text
          style={{
            color: "#888888",
            paddingInline: 10,
            paddingTop: 10,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Selecione a dificuldade dos jogos(você poderá modificar
          posteriormente).
        </Text>
        <AnimatedPagerView
          style={styles.container}
          ref={ref}
          initialPage={position}
          overdrag={rest.overdragEnabled}
          orientation="horizontal"
          offscreenPageLimit={1}
          onPageSelected={handlePageSelected}
        >
          {Object.keys(difficulties).map((k) => (
            <DifficultyCard
              key={k}
              next={difficulties[k].next}
              prev={difficulties[k].prev}
              image={difficulties[k].image}
              title={difficulties[k].title}
              message={difficulties[k].message}
              primaryColor={difficulties[k].primaryColor}
              secondaryColor={difficulties[k].secondaryColor}
            />
          ))}
        </AnimatedPagerView>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <Pressable
            onPress={() => onSelect(position)}
            style={{
              backgroundColor: "#f5a623",
              paddingBlock: 10,
              paddingInline: 20,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: 600 }}>Selecionar</Text>
          </Pressable>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
