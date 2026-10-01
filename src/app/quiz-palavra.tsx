import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import GridSelector, { GridItem } from "@/components/GridSelector";
import { sortearItens } from "@/utils/random";

const poolPalavras: GridItem[] = [
  { id: "1", subtitle: "Amor" },
  { id: "2", subtitle: "Paz" },
  { id: "3", subtitle: "Verdade" },
  { id: "4", subtitle: "Honestidade" },
  { id: "5", subtitle: "Medo" },
  { id: "6", subtitle: "Cansaço" },
  { id: "7", subtitle: "Esperança" },
  { id: "8", subtitle: "Raiva" },
];

const QuizPalavra = () => {
  const router = useRouter();
  const { pacienteId, emoji } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
  }>();

  const palavrasSorteadas = useMemo(() => sortearItens(poolPalavras, 4), []);
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const palavraEscolhida = palavrasSorteadas.find(
    (p) => p.id === selecionado,
  )?.subtitle;

  const handleConfirmar = () => {
    if (!palavraEscolhida) return;

    router.push({
      pathname: "/quiz-escrita",
      params: { pacienteId, emoji, palavraFixa: palavraEscolhida },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Palavra</Text>
        <Text style={styles.subtitle}>Selecione uma palavra:</Text>

        <GridSelector
          items={palavrasSorteadas}
          selectedId={selecionado}
          onSelect={setSelecionado}
        />

        <Pressable
          style={({ pressed }) => [
            styles.pillButton,
            !palavraEscolhida && styles.pillButtonDisabled,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleConfirmar}
          disabled={!palavraEscolhida}
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
    fontSize: 16,
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
  },
  pillButtonDisabled: { backgroundColor: "#ffffff" },
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default QuizPalavra;
