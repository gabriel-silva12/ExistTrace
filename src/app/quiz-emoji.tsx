import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { sortearItens } from "@/utils/random";

import QuizSelector from "@/components/QuizSelector";
import type { QuizOption } from "@/components/QuizSelector/types";

const poolEmojis: QuizOption[] = [
  { id: "1", title: "🥳" },
  { id: "2", title: "😎" },
  { id: "3", title: "👽" },
  { id: "4", title: "💗" },
  { id: "5", title: "😢" },
  { id: "6", title: "😡" },
  { id: "7", title: "😴" },
  { id: "8", title: "😨" },
  { id: "8", title: "T" },
];

const QuizEmoji = () => {
  const router = useRouter();
  const { pacienteId } = useLocalSearchParams<{ pacienteId: string }>();

 /**
   * ""EXPLICAÇÃO RÁPIDA SOBRE o useMemo:
   * Normalmente, toda vez que um componente é atualizado (re-renderizado), todo o código é executado novamente.
   * Se você não usasse o useMemo, 'sortearItens' sortearia NOVOS emojis toda vez que você clicasse em uma carta!
   * O useMemo fixa o resultado na memória para que o sorteio aleatório ocorra apenas UMA VEZ, quando a tela é carregada."" Nãosãominhaspalavras
   */
  const emojisSorteados = useMemo(() => sortearItens(poolEmojis, 4), []);
  
  
  const [selectedId, setSelectedId] = useState<string | null>(null);

 
  const emojiEscolhido = emojisSorteados.find(
    (emoji) => emoji.id === selectedId
  )?.title;

  const handleConfirmar = () => {
    if (!emojiEscolhido) return;

    router.push({
      pathname: "/quiz-palavra",
      params: { pacienteId, emoji: emojiEscolhido },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Como você está?</Text>
        <Text style={styles.subtitle}>Selecione um emoji:</Text>

        <QuizSelector
          options={emojisSorteados}
          selectionMode="single"
          selectedId={selectedId}
          onSelect={setSelectedId}
          columns={2} 
        />

        <Pressable
          style={({ pressed }) => [
            styles.pillButton,
            !emojiEscolhido && styles.pillButtonDisabled,
            pressed && { opacity: 0.5 },
          ]}
          onPress={handleConfirmar}
          disabled={!emojiEscolhido}
        >
          <Text style={styles.pillButtonText}>Confirmar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 24,
    color: "#666666",
    alignSelf: "flex-start",
    marginBottom: 32,
  },
  pillButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  pillButtonDisabled: { backgroundColor: "#cccccc" }, // Changed to gray so it looks disabled!
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default QuizEmoji;