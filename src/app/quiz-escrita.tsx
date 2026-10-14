import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, ScrollView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView 
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsHorizontalScrollIndicator={false}>
        <Text style={styles.title}>Agora é sua vez</Text>
        <Text style={styles.subtitle}>Escreva algo que esteja passando pela sua cabeça:</Text>

        <TextInput
          style={styles.input}
          value={palavraLivre}
          onChangeText={setPalavraLivre}
          autoCapitalize="none"
        />

        <Pressable
          style={[styles.pillButton, !podeContinuar && styles.pillButtonDisabled]}
          onPress={continuar}
          disabled={!podeContinuar}
        >
          <Text style={styles.pillButtonText}>Continuar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 40,
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
  input: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#111111",
  },
  pillButton: {
    width: "50%",
    height: 54,
    backgroundColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  pillButtonDisabled: { backgroundColor: "#bbbbbb" },
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default QuizEscrita;