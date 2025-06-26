import ModalView from "@/components/templates/ModalView";
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
    gap: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  titleContainer: {
    width: "100%",
    maxWidth: 360,
    flexDirection: "row",
    padding: 10,
    gap: 20,
    backgroundColor: "#3478f6",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat",
    color: "#FFF",
  },
});

export default function HistoryScreen() {
  const router = useRouter();

  const { gamesHistory, deleteGame } = useHistoryStore((state) => state);

  return (
    <ModalView title="Histórico">
      <FlatList
        data={gamesHistory}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 10,
              margin: 10,
              borderRadius: 4,
              backgroundColor: "#FFF",
              alignItems: "center",
              justifyContent: "space-between",

              shadowColor: "#aaa",
              shadowOpacity: 0.3,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 2,
              elevation: 2,
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
                style={{ color: "#333", fontWeight: "700", marginBottom: 5 }}
              >
                {item.category}
              </Text>
              <Text style={{ color: "#555" }}>
                {format(item.date, "dd-MMM HH:mm", {
                  locale: ptBR,
                })}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#888" }}>
                {item.words.length} palavras
              </Text>
              <Text style={{ color: "#888" }}>{item.correctWords} certas</Text>
              <Text style={{ color: "#888" }}>{item.passedWords} passadas</Text>
            </View>
            <Feather
              name="trash-2"
              size={24}
              onPress={() => deleteGame(item)}
              color={"#a33a4a"}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        keyExtractor={(_, index) => `game-${index}`}
      />
    </ModalView>
  );
}
