import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",

    //ios
    shadowColor: "#185366",       // Using your palette's deep blue makes the shadow look natural, not dirty
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,          // Keep it very soft and subtle
    shadowRadius: 12,

    //android
    elevation: 3,    
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12,
  },
  linha: {
    fontSize: 16,
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