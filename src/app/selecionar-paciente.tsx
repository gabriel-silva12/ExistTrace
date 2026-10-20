import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/hooks/context/AuthContext";

type Paciente = {
  id: string;
  nome: string;
  idade: number;
  ultimaSessao: string | null;
};

const PACIENTES: Paciente[] = [
  { id: "1", nome: "Jullian Gemaque", idade: 25, ultimaSessao: "2026-09-21T12:00:00" },
];

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function formatarData(iso: string | null) {
  if (!iso) return "Sem sessões";
  const d = new Date(iso);
  return `${d.getDate()} ${MESES[d.getMonth()]}`;
}

function iniciais(nome: string) {
  const partes = nome.trim().split(" ");
  return (partes[0][0] + (partes[1]?.[0] ?? "")).toUpperCase();
}

export default function SelecionarPaciente() {
  const router = useRouter();
  const { perfil } = useAuth();
  const nomePsicologo = perfil?.nome || "Psicólogo";

  const iniciarTeste = (p: Paciente) => {
    router.push({
      pathname: "/detalhe-paciente",
      params: { pacienteId: p.id, pacienteNome: p.nome },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlob} />
        <SafeAreaView edges={["top"]}>
            <TouchableOpacity
  style={styles.backButton}
  onPress={() => router.back()}
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
>
  <Ionicons name="arrow-back" size={28} color="#fff" />
</TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.avatarHeader}>
              <Ionicons name="person" size={34} color="#3F7FA3" />
            </View>
            <Text style={styles.welcome}>
              Bem vindo,{"\n"}
              {nomePsicologo}
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <View style={styles.titleRow}>
        <Text style={styles.title}>Meus Pacientes</Text>
        <TouchableOpacity onPress={() => router.push("/cadastro-paciente")}>
          <Ionicons name="add-circle-outline" size={42} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={PACIENTES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum paciente cadastrado.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => iniciarTeste(item)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{iniciais(item.nome)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.sessao}>
                Última Sessão: {formatarData(item.ultimaSessao)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#BCD9E8" },
  header: {
    backgroundColor: "#3F7FA3",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    paddingBottom: 24,
  },
  backButton: {
  marginLeft: 16,
  marginTop: 8,
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "rgba(255,255,255,0.2)",
  alignItems: "center",
  justifyContent: "center",
},
  headerBlob: {
    position: "absolute",
    right: -60,
    top: -30,
    width: 220,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#81A9C3",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 14,
  },
  avatarHeader: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#D6E6FA",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: { color: "#fff", fontSize: 28, fontWeight: "700", flexShrink: 1 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    marginTop: 28,
    marginBottom: 14,
  },
  title: { fontSize: 28, fontWeight: "600", color: "#000" },
  list: { paddingHorizontal: 22, paddingBottom: 30, gap: 10 },
  empty: { textAlign: "center", marginTop: 30, fontSize: 16, color: "#335555" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EBF3FA",
    borderRadius: 20,
    padding: 18,
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FDEBAA",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 26, fontWeight: "700", color: "#222233" },
  info: { flex: 1 },
  nome: { fontSize: 20, fontWeight: "700", color: "#000" },
  sessao: { fontSize: 16, color: "#222", marginTop: 4 },
});