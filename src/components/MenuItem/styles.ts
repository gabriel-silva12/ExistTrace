import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#E3E8EC",
    gap: 14,
  },
  semBorda: { borderTopWidth: 0 },
  pressionado: { opacity: 0.6 },
  textos: { flex: 1 },
  titulo: { fontSize: 17, color: "#111" },
  subtitulo: { fontSize: 14, color: "#6B7780", marginTop: 2 },
});