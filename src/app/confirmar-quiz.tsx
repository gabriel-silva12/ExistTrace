import { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/services/supabase";
import Desenho from "@/components/Desenho";
import { useQuiz } from "@/hooks/context/QuizContext";
import { LinearGradient } from "expo-linear-gradient";
import ScreenHeader from "@/components/ScreenHeader";


const ConfirmarQuiz = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { desenho, limparQuiz } = useQuiz();

  const { pacienteId, emoji, palavraFixa, palavraLivre } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
    palavraFixa: string;
    palavraLivre: string;
  }>();

  const [salvando, setSalvando] = useState(false);

  const confirmar = async () => {
    if (salvando) return;
    setSalvando(true);

    const { error } = await supabase.from("sessao_terapia").insert({
      paciente_id: Number(pacienteId),
      emoji,
      palavra_selecionada: palavraFixa,
      palavra_livre: palavraLivre,
      desenho,
    });

    setSalvando(false);

    if (error) {
      console.error(error.message);
      Alert.alert("Não conseguimos salvar a sessão, tente novamente em alguns instantes");
      return;
    }
    limparQuiz();
    router.dismiss(5);
  };

  const recomecar = () => {
    limparQuiz();
    router.dismiss(5);
    router.push({ pathname: "/quiz-emoji", params: { pacienteId } });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <StatusBar style="dark" hidden={false} />
      <ScreenHeader
        titulo="Confirme as respostas"
        compacto
        mostrarAvatar={false}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 12, paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Emoji</Text>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>

          <View style={styles.separador} />

          <View style={styles.linha}>
            <Text style={styles.rotulo}>Palavra selecionada</Text>
            <Text style={styles.valor}>{palavraFixa}</Text>
          </View>

          <View style={styles.separador} />

          <View style={styles.linha}>
            <Text style={styles.rotulo}>Escrita livre</Text>
            <Text style={styles.valor}>{palavraLivre}</Text>
          </View>

          <View style={styles.separador} />

          <View style={styles.linha}>
            <Text style={styles.rotulo}>Desenho livre</Text>
            {desenho && desenho.traces.length > 0 ? (
              <View style={styles.miniatura}>
                <Desenho desenho={desenho} tamanho={160} />
              </View>
            ) : (
              <Text style={styles.semDados}>Nenhum desenho disponível</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <LinearGradient
        pointerEvents="none"
        colors={["rgba(234, 243, 246, 0)", "#eaf3f6"]}
        style={[styles.fade, { height: insets.bottom + 110 }]}
      />

          {/* dock flutuante: mesma superfície do card */}
      <View style={[styles.dock, { bottom: insets.bottom + 12 }]}>
        <Pressable
          style={({ pressed }) => [styles.botaoSecundario, pressed && { opacity: 0.6 }]}
          onPress={recomecar}
          disabled={salvando}
        >
          <MaterialCommunityIcons name="restart" size={20} color="#407FA0" />
          <Text style={styles.botaoSecundarioTexto}>Recomeçar</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botaoPrimario,
            salvando && styles.botaoDesabilitado,
            pressed && { opacity: 0.85 },
          ]}
          onPress={confirmar}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <MaterialCommunityIcons name="check" size={20} color="#ffffff" />
              <Text style={styles.botaoPrimarioTexto}>Confirmar</Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 10, // dá espaço para a sombra do card não ser cortada
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 4,
    paddingTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,

    // ios
    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,

    // android
    elevation: 3,
  },
  linha: {
    paddingVertical: 14,
  },
  rotulo: {
    fontSize: 14,
    color: "#6b7684",
    marginBottom: 8,
  },
  emoji: { fontSize: 40 },
  valor: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111111",
  },
  semDados: {
    fontSize: 16,
    color: "#6b7684",
  },
  miniatura: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d7e2e5",
    borderRadius: 12,
    overflow: "hidden",
  },
  separador: {
    height: 1.2,
    backgroundColor: "#d7e2e5",
  },
  botoes: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
    dock: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    gap: 8,
    padding: 8,
    borderRadius: 34, // raio do botão (26) + padding (8): cantos concêntricos
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(24, 83, 102, 0.08)",
    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 8,
  },
  botaoSecundario: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(64, 127, 160, 0.1)",
  },
  botaoSecundarioTexto: {
    color: "#407FA0",
    fontSize: 16,
    fontWeight: "700",
  },
  botaoPrimario: {
    flex: 1.3, // um pouco maior: é a ação principal
    height: 52,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#407FA0",
  },
  botaoPrimarioTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  botaoDesabilitado: { backgroundColor: "#9fb8c4" },
  fade: {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
},
    
});

export default ConfirmarQuiz;