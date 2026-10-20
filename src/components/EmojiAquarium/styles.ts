
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  aquarium: {
    flex: 1,
    width: "100%",
    position: "relative",
    overflow: "hidden",
    borderRadius: 24,
  },

  emoji: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 80,
    height: 80,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },

  emojiSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 2,
  },

  emojiPressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  emojiText: {
    fontSize: 42,
    textAlign: "center",
  },
});
