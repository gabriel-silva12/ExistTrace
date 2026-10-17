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
    ...StyleSheet.absoluteFillObject,
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
  circuloPequeno: {
    position: "absolute",
    left: -30,
    bottom: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },

  saudacao: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "400",
  },
  titulo: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 2,
  },

  avatarCircle: {
    position: "absolute",
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;