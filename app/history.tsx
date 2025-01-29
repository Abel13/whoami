import { useHistoryStore } from "@/hooks/useHistoryStore";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: "#123",
    gap: 10,
  },
  buttonContainer: {
    height: 50,
    width: 200,
    backgroundColor: "#0a7ea4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default function HistoryScreen() {
  const router = useRouter();

  const { gamesHistory, deleteGame } = useHistoryStore((state) => state);

  return (
    <View style={styles.container}>
      <Pressable style={styles.buttonContainer} onPress={router.back}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Pressable>

      <FlatList
        data={gamesHistory}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 10,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#FFF",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() =>
              router.push({
                pathname: "/result",
                params: {
                  words: JSON.stringify(item.words),
                  category: item.category,
                  id: item.id,
                },
              })
            }
          >
            <View>
              <Text
                style={{ color: "#FFF", fontWeight: "700", marginBottom: 5 }}
              >
                {item.category}
              </Text>
              <Text style={{ color: "#aaa" }}>
                {format(item.date, "dd-MMM HH:mm", {
                  locale: ptBR,
                })}
              </Text>
            </View>
            <Text style={{ color: "#FFF" }}>{item.words.length} palavras</Text>
            <Text style={{ color: "#FFF" }}>{item.correctWords} certas</Text>
            <Text style={{ color: "#FFF" }}>{item.passedWords} passadas</Text>
            <Feather
              name="trash-2"
              size={24}
              onPress={() => deleteGame(item)}
              color={"#FFF"}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        keyExtractor={(_, index) => `game-${index}`}
      />
    </View>
  );
}
