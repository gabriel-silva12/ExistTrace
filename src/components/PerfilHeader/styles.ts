import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#407FA0",
    paddingTop: 80,
    paddingBottom: 14,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textos: {
    flex: 1,
  },
  saudacao: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 2,
  },
  nome: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
  },
  idade: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 2,
  },
  avatarCirculo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#dfddd5",
    justifyContent: "center",
    alignItems: "center",
  },
});