import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import { usePacientes } from "@/hooks/usePacientes";

const Pacientes = () => {
  const router = useRouter();
  const { pacientes, carregando } = usePacientes();
  const [busca, setBusca] = useState("");

  const pacientesFiltrados = useMemo(() => {
    if (!busca.trim()) return pacientes;
    return pacientes.filter((p) =>
      p.codinome.toLowerCase().includes(busca.trim().toLowerCase())
    );
  }, [pacientes, busca]);

  const abrirHistorico = (paciente: (typeof pacientes)[number]) => {
    router.push({
      pathname: "/historico-paciente",
      params: {
        pacienteId: String(paciente.id),
        nomePaciente: paciente.codinome,
        idadePaciente: String(paciente.idade),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={22} color="#6b7684" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pacientes..."
          placeholderTextColor="#6b7684"
          value={busca}
          onChangeText={setBusca}
        />
        <Pressable
          onPress={() => router.push("/cadastro-paciente")}
          hitSlop={8}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#1a1a1a" />
        </Pressable>
      </View>

      <FlatList
        data={pacientesFiltrados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !carregando ? (
            <Text style={styles.vazioTexto}>
              {busca
                ? "Nenhum paciente encontrado."
                : "Nenhum paciente cadastrado ainda."}
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable
              style={styles.cardBody}
              onPress={() => abrirHistorico(item)}
            >
              <View style={styles.avatarCirculo}>
                <MaterialCommunityIcons name="account" size={28} color="#6b7684" />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardNome}>{item.codinome}</Text>
                {/* TODO: "Última Sessão" e "Status" dependem de dados de sessao_terapia
                    que ainda não estão ligados ao paciente - placeholder por enquanto */}
                <Text style={styles.cardLinha}>Última Sessão: —</Text>
                <Text style={styles.cardLinha}>Status: —</Text>
              </View>
            </Pressable>

            <View style={styles.cardFooter}>
              <Pressable
                style={styles.footerAction}
                onPress={() =>
                  Alert.alert("Em breve", "Observações do paciente ainda não disponíveis.")
                }
              >
                <MaterialCommunityIcons name="comment-outline" size={18} color="#1a1a1a" />
                <Text style={styles.footerActionText}>Observações</Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert("Em breve", "Edição de paciente ainda não disponível.")
                }
                hitSlop={8}
              >
                <MaterialCommunityIcons name="square-edit-outline" size={20} color="#1a1a1a" />
              </Pressable>
            </View>
          </View>
        )}
      />

      <TabBar activeTab="patients" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c3e0ea",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f7f8",
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  vazioTexto: {
    textAlign: "center",
    color: "#4a5560",
    marginTop: 24,
  },
  card: {
    backgroundColor: "#eef4f6",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  avatarCirculo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#d7e6ea",
    justifyContent: "center",
    alignItems: "center",
  },
  cardInfo: {
    flex: 1,
  },
  cardNome: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  cardLinha: {
    fontSize: 14,
    color: "#3a4450",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#d7e2e5",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  footerAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerActionText: {
    fontSize: 14,
    color: "#1a1a1a",
  },
  tabBar: {
    backgroundColor: "#0b0f2e",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    paddingBottom: 20,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabActiveIndicator: {
    position: "absolute",
    top: -14,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#2fb7c9",
  },
});

export default Pacientes;