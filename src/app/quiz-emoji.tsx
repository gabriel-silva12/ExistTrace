import { useMemo, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { sortearItens } from "@/utils/random";
import QuizScreen from "@/components/QuizScreen";
import QuizSelector from "@/components/QuizSelector";
import type { QuizOption } from "@/components/QuizSelector/types";
import emojis from './data/emojis.json'

const emojisPool : QuizOption[] = emojis

const QuizEmoji = () => {
  const router = useRouter();
  const { pacienteId } = useLocalSearchParams<{ pacienteId: string }>();

  /**
   * ""EXPLICAÇÃO RÁPIDA SOBRE o useMemo:
   * Normalmente, toda vez que um componente é atualizado (re-renderizado), todo o código é executado novamente.
   * Se você não usasse o useMemo, 'sortearItens' sortearia NOVOS emojis toda vez que você clicasse em uma carta!
   * O useMemo fixa o resultado na memória para que o sorteio aleatório ocorra apenas UMA VEZ, quando a tela é carregada."" Nãosãominhaspalavras
   */
  const emojisSorteados = useMemo(() => sortearItens(emojisPool, 4), []);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const emojiEscolhido = emojisSorteados.find(
    (emoji) => emoji.id === selectedId,
  )?.title;

  const handleConfirmar = () => {
    if (!emojiEscolhido) return;

    router.push({
      pathname: "/quiz-palavra",
      params: { pacienteId, emoji: emojiEscolhido },
    });
  };

  return (
    <QuizScreen pronto={!!emojiEscolhido} onContinuar={handleConfirmar} confirmarSaida>
    <Text style={styles.title}>Um emoji para o seu dia</Text>

    <QuizSelector
      options={emojisSorteados}
      selectionMode="single"
      selectedId={selectedId}
      onSelect={setSelectedId}
      columns={2}
      fontSize={48}
    />
  </QuizScreen>
  );
};

const styles = StyleSheet.create({
    title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 32,
  },
});

export default QuizEmoji;
