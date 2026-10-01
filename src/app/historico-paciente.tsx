import { FlatList, StyleSheet, Text, View } from "react-native";

import SessaoCard from "@/components/SessaoCard";
import { Sessao } from "@/components/SessaoCard/types";

const sessoesMock: Sessao[] = [
  {
    id: 1,
    data: "2026-09-21",
    emoji: "🥳",
    palavra_fixa: "Animado",
    palavra_livre: "Foi um bom dia",
  },
  {
    id: 2,
    data: "2026-09-19",
    emoji: "😎",
    palavra_fixa: "Confiante",
    palavra_livre: "Consegui resolver o problema",
  },
  {
    id: 3,
    data: "2026-09-18",
    emoji: "👽",
    palavra_fixa: "Estranho",
    palavra_livre: "Não sei explicar o que senti",
  },
  {
    id: 4,
    data: "2026-09-15",
    emoji: "💗",
    palavra_fixa: "Grato",
    palavra_livre: "Livre",
  },
];

const HistoricoPaciente = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Sessões</Text>

      <FlatList
        data={sessoesMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SessaoCard sessao={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default HistoricoPaciente;
