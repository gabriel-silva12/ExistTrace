import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { sortearItens } from "@/utils/random";
import QuizScreen from "@/components/QuizScreen";
import EmojiAquarium from "@/components/EmojiAquarium";
import type { QuizOption } from "@/components/QuizSelector/types";
import emojisPositivosJson from "./data/emojis-positivos.json";
import emojisNegativosJson from "./data/emojis-negativos.json";
import { sortearBalanceado } from "@/utils/random";
import type { CargaEmoji } from "@/components/SessaoCard/types";

const emojisPositivos: QuizOption[] = emojisPositivosJson;
const emojisNegativos: QuizOption[] = emojisNegativosJson;


const calcularCarga = (ids: string[]): CargaEmoji => {
  const positivos = ids.filter((id) => id.startsWith("pos-")).length;

  if (positivos === 2) return "POSITIVA";
  if (positivos === 0) return "NEGATIVA";
  return "MISTA";
};


const QuizEmoji = () => {
  const router = useRouter();

  const { pacienteId } = useLocalSearchParams<{
    pacienteId: string;
  }>();

  const emojisSorteados = useMemo(
    () => sortearBalanceado(emojisPositivos, emojisNegativos, 3),
    []
  );


  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectEmoji = (id: string) => {
    setSelectedIds((previous) => {
      if (previous.includes(id)) {
        return previous.filter((selectedId) => selectedId !== id);
      }

      if (previous.length >= 2) {
        return previous;
      }

      return [...previous, id];
    });
  };

  const emojisEscolhidos = emojisSorteados
    .filter((emoji) => selectedIds.includes(emoji.id))
    .map((emoji) => emoji.title)
    .filter((title): title is string => title !== undefined);

  const pronto = emojisEscolhidos.length === 2;

  const handleConfirmar = () => {
    if (!pronto) return;

    router.push({
      pathname: "/quiz-palavra",
      params: {
        pacienteId,
        emoji: emojisEscolhidos.join(" "),
        cargaEmoji: calcularCarga(selectedIds),
      },
    });
  };

  return (
    <QuizScreen pronto={pronto} onContinuar={handleConfirmar} confirmarSaida>
      <Text style={styles.title}>Vamos lá, selecione dois emojis:</Text>

      <EmojiAquarium
        options={emojisSorteados}
        selectedIds={selectedIds}
        onSelect={handleSelectEmoji}
        disabled={pronto}
      />
    </QuizScreen>
  );
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
});

export default QuizEmoji;
