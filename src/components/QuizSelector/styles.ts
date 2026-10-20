import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    position: "relative",
  },

  word: {
    position: "absolute",
    minHeight: 56,
    maxWidth: "85%",
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },

  wordText: {
    color: "#344B59",
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.2,
  },

  selectedWordText: {
    color: "#3e6e82",
    fontWeight: "700",
    fontSize: 50
  },

  selectedWordContainer: {
    backgroundColor: "#3e6e8273",
  },
});

export default styles;
