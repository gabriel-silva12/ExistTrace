import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { sortearItens } from "@/utils/random";
import QuizScreen from "@/components/QuizScreen";
import QuizSelector from "@/components/QuizSelector";
import type { QuizOption } from "@/components/QuizSelector/types";
import palavras from "./data/palavras.json";

const palavrasPool: QuizOption[] = palavras;

const QuizPalavra = () => {
  const router = useRouter();
  const { pacienteId, emoji, cargaEmoji } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
    cargaEmoji: string;
  }>();

  const palavrasSorteadas = useMemo(() => sortearItens(palavrasPool, 4), []);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const palavraEscolhida = palavrasSorteadas.find(
    (p) => p.id === selectedId,
  )?.title;

  const handleConfirmar = () => {
    if (!palavraEscolhida) return;

    router.push({
      pathname: "/quiz-escrita",
      params: { pacienteId, emoji, cargaEmoji, palavraFixa: palavraEscolhida },
    });
  };

  return (
    <QuizScreen pronto={!!palavraEscolhida} onContinuar={handleConfirmar}>
      <View style={styles.conteudoQuiz}>
        <Text style={styles.title}>Uma palavra, para definir esse dia:</Text>

        <View style={styles.areaPalavras}>
          <QuizSelector
            options={palavrasSorteadas}
            selectionMode="single"
            selectedId={selectedId}
            onSelect={setSelectedId}
            fontSize={24}
          />
        </View>
      </View>
    </QuizScreen>
  );
  /* */
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#173B4D",
    marginBottom: 24,
    marginTop: 40,
    paddingHorizontal: 0,
  },
  conteudoQuiz: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  areaPalavras: {
    flex: 1,
    minHeight: 300,
    position: "relative",
  },
});

export default QuizPalavra;
