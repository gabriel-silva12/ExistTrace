import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import GridSelector, { GridItem } from "@/components/GridSelector";
import { sortearItens } from "@/utils/random";

const poolEmojis: GridItem[] = [
  { id: "1", title: "🥳" },
  { id: "2", title: "😎" },
  { id: "3", title: "👽" },
  { id: "4", title: "💗" },
  { id: "5", title: "😢" },
  { id: "6", title: "😡" },
  { id: "7", title: "😴" },
  { id: "8", title: "😨" },
];

const QuizEmoji = () => {
  const router = useRouter();
  const { pacienteId } = useLocalSearchParams<{ pacienteId: string }>();

  const emojisSorteados = useMemo(() => sortearItens(poolEmojis, 4), []);
  const [selecionado, setSelecionado] = useState<string | null>(null);

  const emojiEscolhido = emojisSorteados.find(
    (e) => e.id === selecionado,
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

        <GridSelector
          items={emojisSorteados}
          selectedId={selecionado}
          onSelect={setSelecionado}
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
  },
  pillButtonDisabled: { backgroundColor: "#407FA0" },
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default QuizEmoji;
