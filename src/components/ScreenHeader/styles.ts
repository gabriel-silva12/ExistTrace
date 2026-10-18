import { StyleSheet } from "react-native";

const RAIO = 32;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3e6e82",
    paddingHorizontal: 24,
    paddingBottom: 70,
    borderBottomLeftRadius: RAIO,
    borderBottomRightRadius: RAIO,
  },
  headerCompacto: {
    paddingBottom: 28,
  },

  // camada decorativa: o overflow hidden fica aqui, não no header
  fundo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: RAIO,
    borderBottomRightRadius: RAIO,
    overflow: "hidden",
  },
  circuloGrande: {
    position: "absolute",
    right: -50,
    top: -30,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
  },
  anel: {
    position: "absolute",
    left: -20,
    bottom: -50,
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },

  botaoVoltar: {
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    marginLeft: -8,
    marginBottom: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    justifyContent: "center",
    alignItems: "center",
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textos: {
    flex: 1, // ocupa o que sobrar ao lado do avatar
  },

  saudacao: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.75)",
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  titulo: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  chip: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
  chipTexto: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
  descricao: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 21,
    color: "rgba(255, 255, 255, 0.8)",
  },

  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  iniciais: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default styles;