import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ScreenHeader from "@/components/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import AvatarPerfil from "@/components/AvatarPerfil";
import MenuItem from "@/components/MenuItem";
import TabBar from "@/components/TabBar";
import { cores } from "@/components/quiz-ui";
import { useAuth } from "@/hooks/context/AuthContext";

const CRP_PROVISORIO = "CRP 00/12345";//mudar depois pra nao ficar estatico

function pegarIniciais(nome?: string) {
  if (!nome) return undefined;
  const partes = nome.trim().split(/\s+/);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase();
}

export default function Ajustes() {
  const router = useRouter();
  const { perfil, logout } = useAuth();

  const emBreve = () => Alert.alert("Em breve", "Funcionalidade em desenvolvimento.");

  const sair = () => {
    Alert.alert("Sair", "Deseja terminar a sessão atual?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

//ajuste a ser feito: diminuir o tamanho do header azul do unfo de "ajustes"; esconder essa barra quando o usuário "arrastar" pra baixo

  return (
    <View style={styles.container}>
      <ScreenHeader
        titulo="Ajustes"
        subtitulo=""
        mostrarAvatar={false}
      />
      <ScrollView contentContainerStyle={styles.conteudo}>

          <View style={styles.cardPerfil}>
            <AvatarPerfil iniciais={pegarIniciais(perfil?.nome)} tamanho={64} />
            <View style={styles.perfilTextos}>
              <Text style={styles.nome} numberOfLines={2}>
                {perfil?.nome ?? "Profissional"}
              </Text>
              <Text style={styles.crp}>{CRP_PROVISORIO}</Text>
            </View>
            <Pressable
              onPress={emBreve}
              style={({ pressed }) => [styles.botaoEditar, pressed && styles.pressionado]}
            >
              <Feather name="edit-2" size={16} color={cores.botao} />
              <Text style={styles.textoEditar}>Editar perfil</Text>
            </Pressable>
          </View>

          <Text style={styles.secao}>Preferências do app</Text>
          <View style={styles.grupo}>
            <MenuItem semBorda icone="settings" titulo="Configurações" onPress={emBreve} />
            <MenuItem icone="bell" titulo="Notificações" onPress={emBreve} />
          </View>

          <Text style={styles.secao}>Suporte</Text>
          <View style={styles.grupo}>
            <MenuItem semBorda icone="message-square" titulo="Falar com o suporte" onPress={emBreve} />
            <MenuItem icone="help-circle" titulo="Ajuda" onPress={emBreve} />
            <MenuItem icone="info" titulo="Sobre o ExistTrace" onPress={emBreve} />
          </View>

          <Pressable
            onPress={sair}
            style={({ pressed }) => [styles.botaoSair, pressed && styles.pressionado]}
          >
            <Text style={styles.textoSair}>Sair da conta</Text>
          </Pressable>

          <Text style={styles.versao}>
            Versão {Constants.expoConfig?.version ?? "0.0.0"} · Beta (app em fase de testes)
          </Text>
      </ScrollView>
      <TabBar activeTab="configuracoes" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  area: { flex: 1 },
  conteudo: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  pressionado: { opacity: 0.6 },

  titulo: { fontSize: 34, fontWeight: "800", color: "#111" },
  subtitulo: { fontSize: 16, color: "#6B7780", marginTop: 4 },

  cardPerfil: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 24,
    padding: 16,
    marginTop: 20,
  },
  
  perfilTextos: { flex: 1 },
  nome: { fontSize: 20, fontWeight: "700", color: "#111" },
  crp: { fontSize: 14, color: "#6B7780", marginTop: 2 },
  botaoEditar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: cores.botao,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  textoEditar: { fontSize: 14, fontWeight: "600", color: cores.botao },

  secao: { fontSize: 18, fontWeight: "700", color: "#111", marginTop: 24, marginBottom: 10 },
  grupo: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 20,
    overflow: "hidden",
  },

  botaoSair: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#C0392B",
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 28,
  },
  textoSair: { fontSize: 17, fontWeight: "700", color: "#C0392B" },

  versao: { textAlign: "center", fontSize: 13, color: "#6B7780", marginTop: 18 },
});