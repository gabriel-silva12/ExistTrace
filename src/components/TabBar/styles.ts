import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 64,
    backgroundColor: "#3e6e82",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 34,
    shadowColor: "#203B46",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 6,
  },

  // área interna sem borda nem padding: aqui a posição da pílula é exata
  trilho: {
    flex: 1,
    flexDirection: "row",
  },

  // sem sombra nem elevation: no Android a elevation a colocaria acima dos ícones
  pilula: {
    position: "absolute",
    top: 6,
    left: 0,
    height: 50,
    borderRadius: 26,
    backgroundColor: "#ffffff",
  },

  // cada aba ocupa um terço da barra (área de toque)
  zona: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  // segunda camada (ícone ativo) empilhada sobre a primeira
  camadaTopo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  conteudoAba: {
    alignItems: "center",
    gap: 2,
  },

  rotulo: {
    fontSize: 11,
    fontWeight: "700",
  },
});

export default styles;