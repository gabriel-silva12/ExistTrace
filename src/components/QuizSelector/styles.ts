import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    flex: 1,
    minWidth: 0,
  },

  card: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },

  selectedCard: {
    backgroundColor: "#407FA0",
    borderColor: "#eaeaed",
  },

  pressedCard: {
    opacity: 0.8,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#111111",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 24,
    color: "#111111",
    textAlign: "center",
  },

  selectedText: {
    color: "#ffffff",
  },
});

export default styles;

