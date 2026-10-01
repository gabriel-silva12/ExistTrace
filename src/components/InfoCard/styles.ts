import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  linha: {
    fontSize: 14,
    color: "#333333",
  },
  avatarCirculo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarFoto: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});