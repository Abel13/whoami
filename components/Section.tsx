import { StyleSheet, Text, View } from "react-native";

export const SectionView = ({ title = "sessão", children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: { color: "#a1a1a1", paddingInline: 5 },
  content: {
    gap: 5,
    paddingTop: 10,
    padding: 5,
    borderTopColor: "#a1a1a1",
    borderTopWidth: 1,
  },
});
