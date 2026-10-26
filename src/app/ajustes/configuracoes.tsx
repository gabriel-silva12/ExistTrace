import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import ScreenHeader from "@/components/ScreenHeader";
import { cores } from "@/components/quiz-ui";

export default function Notificacoes() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScreenHeader
        titulo="Configurações"
        subtitulo="Configurações do aplicativo"
        mostrarAvatar={false}
        onVoltar={() => router.back()}
        compacto
      />
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.secao}>Geral</Text> 
        <View style={styles.card}>
          <Text style={styles.placeholder}>Conteúdo em breve.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingHorizontal: 12, paddingTop: 16, paddingBottom: 24 },
  secao: { fontSize: 17, fontWeight: "700", color: "#111", marginBottom: 8 },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 20,
    padding: 16,
  },
  placeholder: { fontSize: 15, color: "#6B7780" },
});