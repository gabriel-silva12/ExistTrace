import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TextInput } from "react-native";

import QuizScreen from "@/components/QuizScreen";

const QuizEscrita = () => {
  const router = useRouter();
  const { pacienteId, emoji, palavraFixa } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
    palavraFixa: string;
  }>();

  const [palavraLivre, setPalavraLivre] = useState("");
  const podeContinuar = palavraLivre.trim().length > 0;

  const continuar = () => {
    if (!podeContinuar) return;

    router.push({
      pathname: "/quiz-desenho",
      params: {
        pacienteId,
        emoji,
        palavraFixa,
        palavraLivre: palavraLivre.trim(),
      },
    });
  };

  return (
    <QuizScreen pronto={podeContinuar} onContinuar={continuar}>
      <Text style={styles.title}>Agora é sua vez</Text>

     <TextInput
        style={styles.input}
        value={palavraLivre}
        onChangeText={setPalavraLivre}
        placeholder="Escreva uma palavra"
        placeholderTextColor="rgba(17, 17, 17, 0.25)"
        selectionColor="#407FA0"
        autoFocus
        autoCapitalize="sentences"
        multiline
        scrollEnabled
      />
    </QuizScreen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 24,
  },
 input: {
    fontSize: 28,
    color: "#111111",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(64, 127, 160, 0.5)",
    paddingVertical: 8,
    maxHeight: 200, // cerca de 5 linhas; depois disso o texto rola dentro do campo
    textAlignVertical: "top", // Android: o texto começa no topo, não no meio
  },
});

export default QuizEscrita;