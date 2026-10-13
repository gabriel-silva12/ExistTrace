import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 0,
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
    borderRadius: 16,
    backgroundColor: "#ffffff",

    // iOS
    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    // Android
    elevation: 3,
  },

  selectedCard: {
     backgroundColor: "#407FA0",
    borderColor: "#eaeaed",

    // stronger, tinted shadow for the selected state
    shadowColor: "#407FA0",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },

  pressedCard: {
    opacity: 0.8,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111111",
    textAlign: "center",
  },

  emoji: {
    fontSize: 24,
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

