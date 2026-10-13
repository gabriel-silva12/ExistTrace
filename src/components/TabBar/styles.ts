import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
     position: "absolute",
    left: 16,
    right: 16,
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(62, 110, 130, 0.92)", // era "#3e6e82"
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",    // borda sutil que dá efeito de vidro
    borderRadius: 34,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },

  // cada aba ocupa um terço da barra (área de toque)
  zona: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  aba: {
    height: 52,
    minWidth: 48,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    gap: 8,
  },

  abaAtiva: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
  },

  rotulo: {
    color: "#3e6e82",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default styles;