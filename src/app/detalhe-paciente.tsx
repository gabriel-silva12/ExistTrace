import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { cores, LogoCircle, PacienteHeader, PrimaryButton } from "@/components/quiz-ui";

const MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];


const SESSOES = [
  { id: "2", titulo: "Sessão 2", data: "18/09", duracao: "2 horas" },
  { id: "1", titulo: "Sessão 1", data: "13/09", duracao: "2 horas" },
];

type Params = { pacienteId: string; pacienteNome: string; pacienteIdade: string };

export default function DetalhePaciente() {
  const router = useRouter();
  const params = useLocalSearchParams<Params>();
  const [historicoAberto, setHistoricoAberto] = useState(true);

  const hoje = new Date();
  const dataHoje = `${hoje.getDate()} de ${MESES[hoje.getMonth()]}, ${hoje.getFullYear()}`;

  return (
    <View style={styles.container}>
      <PacienteHeader
        nome={params.pacienteNome}
        idade={params.pacienteIdade}
        onVoltar={() => router.back()}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.centro}>
          <LogoCircle />
          <Text style={styles.sessaoHoje}>Sessão de hoje: {dataHoje}</Text>
          <PrimaryButton
            titulo="Aplicar quiz"
            style={{ width: "75%" }}
            onPress={() => router.push({ pathname: "/quiz-emoji", params })}
          />
        </View>

        <View style={styles.historicoTopo}>
          <Text style={styles.historicoTitulo}>Histórico de Sessões</Text>
          <Pressable onPress={() => setHistoricoAberto((v) => !v)} hitSlop={10}>
            <MaterialCommunityIcons
              name={historicoAberto ? "close-circle-outline" : "chevron-down-circle-outline"}
              size={44}
              color="#000"
            />
          </Pressable>
        </View>

        {historicoAberto && (
          <View style={styles.lista}>
            {SESSOES.map((sessao) => (
              <View key={sessao.id} style={styles.card}>
                <View style={styles.cardTopo}>
                  <View style={styles.dataCirculo}>
                    <Text style={styles.dataTexto}>{sessao.data}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sessaoTitulo}>{sessao.titulo}</Text>
                    <Text style={styles.sessaoDuracao}>
                      Duração da Sessão: {sessao.duracao}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={styles.verResultados}
                  onPress={() =>
                    Alert.alert("Em breve", "Resultados da sessão ainda não disponíveis.")
                  }
                >
                  <MaterialCommunityIcons name="message-text-outline" size={20} color="#000" />
                  <Text style={styles.verResultadosTexto}>Ver Resultados</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  scroll: { paddingBottom: 40 },
  centro: { alignItems: "center", marginTop: 28, paddingHorizontal: 24 },
  sessaoHoje: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  historicoTopo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 36,
    marginBottom: 12,
  },
  historicoTitulo: { fontSize: 28, fontWeight: "700", flexShrink: 1 },
  lista: { paddingHorizontal: 24, gap: 14 },
  card: {
    backgroundColor: "#EBF3FA",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTopo: { flexDirection: "row", alignItems: "center", gap: 14, padding: 14 },
  dataCirculo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: cores.header,
    alignItems: "center",
    justifyContent: "center",
  },
  dataTexto: { color: "#fff", fontSize: 22, fontWeight: "700" },
  sessaoTitulo: { fontSize: 22, fontWeight: "700" },
  sessaoDuracao: { fontSize: 16, marginTop: 4 },
  verResultados: {
    backgroundColor: "#D1DCE3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  verResultadosTexto: { fontSize: 17 },
});