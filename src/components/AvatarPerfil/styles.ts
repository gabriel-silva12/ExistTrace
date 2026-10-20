import { StyleSheet } from "react-native";
import { cores } from "@/components/quiz-ui";

export const styles = StyleSheet.create({
  circulo: {
    backgroundColor: cores.campo,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  iniciais: {
    fontWeight: "700",
    color: cores.header,
  },
});