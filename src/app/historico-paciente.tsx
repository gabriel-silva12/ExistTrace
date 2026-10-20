import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
              {sessoes.length > 0 && (
                <Text style={styles.contagem}>
                  {sessoes.length === 1
                    ? "1 sessão"
                    : `${sessoes.length} sessões`}
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

      <View style={[styles.dock, { bottom: insets.bottom + 12 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          style={({ pressed }) => [
            styles.botaoVoltar,
            pressed ? styles.botaoPressionado : undefined,
          ]}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color="#407FA0" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.botaoPrimario,
            !pacienteIdNum ? styles.botaoDesabilitado : undefined,
            pressed && pacienteIdNum ? styles.botaoPressionado : undefined,
          ]}
          disabled={!pacienteIdNum}
          onPress={() =>
            router.push({
              pathname: "/quiz-emoji",
              params: { pacienteId },
            })
          }
        >
          <Text style={styles.botaoPrimarioTexto}>Aplicar novo quiz</Text>
        </Pressable>
      </View>
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
    paddingHorizontal: 8, // dentro da lista: a sombra dos cards não é mais cortada
    paddingTop: 16,
    paddingBottom: 110, // espaço para o último card passar por cima do botão flutuante
  },
  titulo: {
    fontSize: 28,
    fontWeight: "500",
    color: "#111111",
    marginBottom: 4,
  },
  contagem: {
    fontSize: 15,
    color: "#6b7684",
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 8,
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
  dock: {
    position: "absolute",
    left: 60,
    right: 60,

    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 4,

    backgroundColor: "#FFFFFF",
    borderRadius: 34,
    borderWidth: 1,
    borderColor: "rgba(24, 83, 102, 0.08)",

    shadowColor: "#203B46",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 6,
  },

  botaoVoltar: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F0F6F8",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#E2EDF1",
  },

  botaoPrimario: {
    flex: 1,
    height: 52,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    backgroundColor: "#407FA0",
    borderRadius: 26,
  },

  botaoPrimarioTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  botaoDesabilitado: {
    backgroundColor: "#AABBC2",
  },

  botaoPressionado: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});

export default HistoricoPaciente;
