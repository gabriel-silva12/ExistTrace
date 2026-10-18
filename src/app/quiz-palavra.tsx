import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { sortearItens } from "@/utils/random";
import QuizScreen from "@/components/QuizScreen";
import QuizSelector from "@/components/QuizSelector";
import type { QuizOption } from "@/components/QuizSelector/types";

const poolPalavras: QuizOption[] = [
  { id: "1", title: "Amor" },
  { id: "2", title: "Paz" },
  { id: "3", title: "Verdade" },
  { id: "4", title: "Honestidade" },
  { id: "5", title: "Medo" },
  { id: "6", title: "Cansaço" },
  { id: "7", title: "Esperança" },
  { id: "8", title: "Raiva" },
];

const QuizPalavra = () => {
  const router = useRouter();
  const { pacienteId, emoji } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
  }>();

  const palavrasSorteadas = useMemo(() => sortearItens(poolPalavras, 4), []);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const palavraEscolhida = palavrasSorteadas.find(
    (p) => p.id === selectedId,
  )?.title;

  const handleConfirmar = () => {
    if (!palavraEscolhida) return;

    router.push({
      pathname: "/quiz-escrita",
      params: { pacienteId, emoji, palavraFixa: palavraEscolhida },
    });
  };

  return (
    <QuizScreen pronto={!!palavraEscolhida} onContinuar={handleConfirmar}>
    <Text style={styles.title}>Qual palavra combina com agora?</Text>

    <QuizSelector
      options={palavrasSorteadas}
      selectionMode="single"
      selectedId={selectedId}
      onSelect={setSelectedId}
      columns={2}
      fontSize={28}
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

export default QuizPalavra;
