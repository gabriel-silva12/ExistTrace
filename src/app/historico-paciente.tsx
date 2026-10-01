import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import SessaoCard from "@/components/SessaoCard";
import { Sessao } from "@/components/SessaoCard/types";
import PerfilHeader from "@/components/PerfilHeader";
import { useLocalSearchParams } from "expo-router";

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
  const { pacienteId, nomePaciente, idadePaciente } = useLocalSearchParams<{
    pacienteId?: string;
    nomePaciente?: string;
    idadePaciente?: string;
  }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <PerfilHeader
        nome={nomePaciente || "Paciente"}
        idade={idadePaciente ? Number(idadePaciente) : undefined}
        estiloNome={{ fontSize: 32 }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.titulo}>Histórico de Sessões</Text>

        <FlatList
          data={sessoesMock}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SessaoCard sessao={item} />}
        />

        <Pressable
          style={({ pressed }) => [
            styles.pillButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() =>
            router.push({
              pathname: "/quiz-emoji",
              params: { pacienteId },
            })
          }
        >
          <Text style={styles.pillButtonText}>Aplicar quiz</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 35,
  },
  pillButton: {
    width: "75%",
    height: 50,
    backgroundColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
    alignSelf: "center",
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HistoricoPaciente;
