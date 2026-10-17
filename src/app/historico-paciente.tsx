import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SessaoCard from "@/components/SessaoCard";
import ScreenHeader from "@/components/ScreenHeader";
import { useSessoes } from "@/hooks/useSessoes";

const HistoricoPaciente = () => {
  const { pacienteId, nomePaciente, idadePaciente } = useLocalSearchParams<{
    pacienteId?: string;
    nomePaciente?: string;
    idadePaciente?: string;
  }>();

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const pacienteIdNum = pacienteId ? Number(pacienteId) : null;
  const { sessoes, carregando, erro, recarregar } = useSessoes(pacienteIdNum);

  return (
    <View style={styles.container}>
      <ScreenHeader
        titulo={nomePaciente || "Paciente"}
        subtitulo={idadePaciente ? `${idadePaciente} anos` : undefined}
        compacto
      />

      {carregando ? (
        <ActivityIndicator style={styles.estado} color="#407FA0" />
      ) : erro ? (
        <View style={styles.estado}>
          <Text style={styles.estadoTexto}>{erro}</Text>
          <Pressable onPress={recarregar} hitSlop={8}>
            <Text style={styles.tentarNovamente}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={sessoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SessaoCard sessao={item} />}
          style={styles.lista}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <Text style={styles.titulo}>Histórico de sessões</Text>
              {sessoes.length > 0 && (
                <Text style={styles.contagem}>
                  {sessoes.length === 1 ? "1 sessão" : `${sessoes.length} sessões`}
                </Text>
              )}
            </View>
          }
          ListEmptyComponent={
            <Text style={[styles.estado, styles.estadoTexto]}>
              Nenhuma sessão registrada ainda.
            </Text>
          }
        />
      )}

      <Pressable
        style={({ pressed }) => [
          styles.pillButton,
          { bottom: insets.bottom + 16 },
          !pacienteIdNum && styles.pillButtonDisabled,
          pressed && { opacity: 0.8 },
        ]}
        disabled={!pacienteIdNum}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf3f6",
  },
  lista: {
    flex: 1,
  },
  listaConteudo: {
    paddingHorizontal: 16, // dentro da lista: a sombra dos cards não é mais cortada
    paddingTop: 24,
    paddingBottom: 120, // espaço para o último card passar por cima do botão flutuante
  },
  titulo: {
    fontSize: 28,
    fontWeight: "500",
    color: "#111111",
    marginBottom: 4,
  },
  contagem: {
    fontSize: 14,
    color: "#6b7684",
    marginBottom: 16,
  },
  estado: {
    marginTop: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  estadoTexto: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
  },
  tentarNovamente: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "bold",
    color: "#407FA0",
  },
  pillButton: {
    position: "absolute",
    left: "12.5%",
    width: "75%",
    height: 56,
    backgroundColor: "#407FA0",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",

    // sombra para o botão "flutuar" sobre a lista
    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  pillButtonDisabled: { backgroundColor: "#cccccc" },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HistoricoPaciente;