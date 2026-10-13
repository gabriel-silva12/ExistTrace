import { useMemo, useState } from "react";
import { Stack, useRouter } from "expo-router";
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
import { formatarParaDataBR } from "@/utils/date";

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
      

      

      <Stack.Screen options={{ gestureEnabled: false }} />
       <Text style={styles.meusPacientes}>Meus Pacientes</Text>
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
                {/* TODO: "Última Sessão" e "Status" dependem de dados de sessao_terapia
                    que ainda não estão ligados ao paciente - placeholder por enquanto */}
                <Text style={styles.cardLinha}>Última Sessão: {" "}
                  {item.ultimaSessao ? formatarParaDataBR(item.ultimaSessao) : "Nehuma"}
                </Text>
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

      <TabBar activeTab="pacientes" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf3f6",
  },
   meusPacientes: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 75,
    marginLeft: 24
  },
  listContent: {
  paddingHorizontal: 20,
  paddingBottom: 120, // era 16
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: 80,
    marginBottom: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
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
  
    //ios
    shadowColor: "#185366",       // Using your palette's deep blue makes the shadow look natural, not dirty
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,          // Keep it very soft and subtle
    shadowRadius: 12,

    //android
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
  
});

export default Pacientes;