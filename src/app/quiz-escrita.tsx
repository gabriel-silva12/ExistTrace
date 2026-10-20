import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import QuizScreen from "@/components/QuizScreen";

const QuizEscrita = () => {
  const router = useRouter();

  const { pacienteId, emoji, palavraFixa } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
    palavraFixa: string;
  }>();

  const [palavraLivre, setPalavraLivre] = useState("");
  const [campoFocado, setCampoFocado] = useState(false);

  const textoLimpo = palavraLivre.trim();
  const podeContinuar = textoLimpo.length > 0;

  const continuar = () => {
    if (!podeContinuar) return;

    router.push({
      pathname: "/quiz-desenho",
      params: {
        pacienteId,
        emoji,
        palavraFixa,
        palavraLivre: textoLimpo,
      },
    });
  };

  return (
    <QuizScreen pronto={podeContinuar} onContinuar={continuar}>
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Text style={styles.title}>Agora, coloque em palavras.</Text>

          <Text style={styles.subtitle}>Escreva livremente</Text>
        </View>

        <View style={[styles.editor, campoFocado && styles.editorFocado]}>
          <TextInput
            style={styles.input}
            value={palavraLivre}
            onChangeText={setPalavraLivre}
            onFocus={() => setCampoFocado(true)}
            onBlur={() => setCampoFocado(false)}
            placeholder="Comece por aqui..."
            placeholderTextColor="#A0A9AF"
            selectionColor="#407FA0"
            autoFocus={false}
            autoCapitalize="sentences"
            multiline
            scrollEnabled
            textAlignVertical="top"
            accessibilityLabel="Escreva uma palavra ou pensamento"
            accessibilityHint="Sua resposta será utilizada na próxima etapa do questionário"
          />

          <View style={styles.editorFooter}>
            <View
              style={[styles.indicador, campoFocado && styles.indicadorFocado]}
            />
          </View>
        </View>
      </View>
    </QuizScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 36,
  },

  cabecalho: {
    marginBottom: 32,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2.2,
    color: "#407FA0",
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#173B4D",
    marginBottom: 24,
    marginTop: 40,
    paddingHorizontal: 0,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "400",
    color: "#718087",
  },

  editor: {
    minHeight: 200,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1.5,
    borderColor: "#E2E9ED",
    borderRadius: 20,
    backgroundColor: "#F8FAFB",
  },

  editorFocado: {
    borderColor: "#3e6e827f",
    backgroundColor: "#FFFFFF",
  },

  input: {
    minHeight: 125,
    maxHeight: 200,
    padding: 0,
    fontSize: 22,
    lineHeight: 32,
    fontWeight: "400",
    color: "#17252D",
  },

  editorFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8EEF1",
  },

  indicador: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#C7D3D9",
  },

  indicadorFocado: {
    backgroundColor: "#3e6e82",
  },

  contador: {
    fontSize: 12,
    fontWeight: "500",
    color: "#98A5AC",
    fontVariant: ["tabular-nums"],
  },

  helper: {
    marginTop: 18,
    paddingHorizontal: 4,
    fontSize: 13,
    lineHeight: 20,
    color: "#8B989F",
    fontStyle: "italic",
  },
});

export default QuizEscrita;
