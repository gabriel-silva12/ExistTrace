import { useMemo, useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import { usePacientes } from "@/hooks/usePacientes";
import { formatarParaDataBR } from "@/utils/date";
import ScreenHeader from "@/components/ScreenHeader";

const Pacientes = () => {
  const router = useRouter();
  const { pacientes, carregando, atualizarPaciente, excluirPaciente } =
    usePacientes();
  const [busca, setBusca] = useState("");
  const [editando, setEditando] = useState<(typeof pacientes)[number] | null>(
    null
  );
  const [codinomeEdit, setCodinomeEdit] = useState("");
  const [idadeEdit, setIdadeEdit] = useState("");
  const [salvando, setSalvando] = useState(false);

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

  const abrirEdicao = (paciente: (typeof pacientes)[number]) => {
    setEditando(paciente);
    setCodinomeEdit(paciente.codinome);
    setIdadeEdit(String(paciente.idade));
  };

  const salvarEdicao = async () => {
    if (!editando) return;
    const idade = Number(idadeEdit);
    if (!codinomeEdit.trim()) {
      Alert.alert("Atenção", "Informe o codinome do paciente.");
      return;
    }
    if (!Number.isInteger(idade) || idade < 0 || idade > 120) {
      Alert.alert("Atenção", "Informe uma idade válida.");
      return;
    }
    try {
      setSalvando(true);
      await atualizarPaciente(editando.id, {
        codinome: codinomeEdit.trim(),
        idade,
      });
      setEditando(null);
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o paciente.");
    } finally {
      setSalvando(false);
    }
  };

  const confirmarExclusao = (paciente: (typeof pacientes)[number]) => {
    Alert.alert(
      "Excluir paciente",
      `Deseja excluir "${paciente.codinome}"? Essa ação não pode ser desfeita.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await excluirPaciente(paciente.id);
            } catch {
              Alert.alert("Erro", "Não foi possível excluir o paciente.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        titulo="Meus pacientes"
        subtitulo={
          pacientes.length === 1 ? "1 paciente" : `${pacientes.length} pacientes`
        }
        compacto
        mostrarAvatar={false}
      />
      <Stack.Screen options={{ gestureEnabled: false }} />
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
          <MaterialCommunityIcons name="plus" size={34} color="#1a1a1a" />
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
                <Text style={styles.cardLinha}>
                  Última Sessão:{" "}
                  {item.ultimaSessao
                    ? formatarParaDataBR(item.ultimaSessao)
                    : "Nenhuma"}
                </Text>
              </View>
            </Pressable>

            <View style={styles.cardFooter}>
              <Pressable
                style={styles.footerAction}
                onPress={() =>
                  Alert.alert(
                    "Em breve",
                    "Observações do paciente ainda não disponíveis."
                  )
                }
              >
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={18}
                  color="#1a1a1a"
                />
                <Text style={styles.footerActionText}>Observações</Text>
              </Pressable>

              <View style={styles.footerIcons}>
                <Pressable onPress={() => abrirEdicao(item)} hitSlop={8}>
                  <MaterialCommunityIcons
                    name="square-edit-outline"
                    size={20}
                    color="#1a1a1a"
                  />
                </Pressable>
                <Pressable onPress={() => confirmarExclusao(item)} hitSlop={8}>
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color="#c0392b"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      <Modal
        visible={!!editando}
        transparent
        animationType="fade"
        onRequestClose={() => setEditando(null)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Editar paciente</Text>

            <Text style={styles.modalLabel}>Codinome</Text>
            <TextInput
              style={styles.modalInput}
              value={codinomeEdit}
              onChangeText={setCodinomeEdit}
              placeholder="Codinome"
              placeholderTextColor="#6b7684"
            />

            <Text style={styles.modalLabel}>Idade</Text>
            <TextInput
              style={styles.modalInput}
              value={idadeEdit}
              onChangeText={setIdadeEdit}
              placeholder="Idade"
              placeholderTextColor="#6b7684"
              keyboardType="number-pad"
              maxLength={3}
            />

            <View style={styles.modalBotoes}>
              <Pressable
                style={[styles.modalBotao, styles.modalBotaoCancelar]}
                onPress={() => setEditando(null)}
                disabled={salvando}
              >
                <Text style={styles.modalBotaoCancelarTexto}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBotao, styles.modalBotaoSalvar]}
                onPress={salvarEdicao}
                disabled={salvando}
              >
                <Text style={styles.modalBotaoSalvarTexto}>
                  {salvando ? "Salvando..." : "Salvar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <TabBar activeTab="pacientes" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf3f6",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 120,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
    marginTop: -14,
    marginBottom: 16,
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 54,
    gap: 10,

    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
  },
  vazioTexto: {
    textAlign: "center",
    color: "#4a5560",
    marginTop: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",

    // iOS
    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,

    // Android
    elevation: 3,
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
    fontSize: 18,
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
  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    color: "#3a4450",
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: "#eaf3f6",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 14,
  },
  modalBotoes: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  modalBotao: {
    flex: 1,
    height: 46,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBotaoCancelar: {
    backgroundColor: "#eaf3f6",
  },
  modalBotaoCancelarTexto: {
    color: "#1a1a1a",
    fontWeight: "600",
  },
  modalBotaoSalvar: {
    backgroundColor: "#185366",
  },
  modalBotaoSalvarTexto: {
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default Pacientes;