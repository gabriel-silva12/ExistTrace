import { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/services/supabase";
import Desenho from "@/components/Desenho";
import { useQuiz } from "@/hooks/context/QuizContext";

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

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Confirme as respostas</Text>
        <Text style={styles.subtitle}>Está tudo certo?</Text>

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

      {/* botões fixos fora da rolagem: sempre ao alcance do polegar */}
      <View style={[styles.botoes, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.pillButtonOutline,
            pressed && { opacity: 0.6 },
          ]}
          onPress={recomecar}
          disabled={salvando}
        >
          <Text style={styles.pillButtonOutlineText}>Recomeçar</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.pillButton,
            salvando && styles.pillButtonDisabled,
            pressed && { opacity: 0.8 },
          ]}
          onPress={confirmar}
          disabled={salvando}
        >
          <Text style={styles.pillButtonText}>
            {salvando ? "Salvando..." : "Confirmar"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16, // dá espaço para a sombra do card não ser cortada
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 4,
    paddingTop: 8,
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
  pillButton: {
    flex: 1,
    height: 54,
    backgroundColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  pillButtonDisabled: { backgroundColor: "#cccccc" },
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  pillButtonOutline: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  pillButtonOutlineText: {
    color: "#407FA0",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmarQuiz;