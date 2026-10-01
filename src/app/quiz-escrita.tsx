import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const QuizEscrita = () => {
  const router = useRouter();
  const { pacienteId, emoji, palavraFixa } = useLocalSearchParams<{
    pacienteId: string;
    emoji: string;
    palavraFixa: string;
  }>();

  const [palavraLivre, setPalavraLivre] = useState("");

  const handleConfirmar = () => {
    console.log("Resultado do quiz (ainda não salvo no banco):", {
      pacienteId,
      emoji,
      palavraFixa,
      palavraLivre,
    });

    router.push({
      pathname: "/dashboard",
      params: { pacienteId },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Agora é sua vez</Text>
        <Text style={styles.subtitle}>Escreva uma palavra:</Text>

        <TextInput
          style={styles.input}
          value={palavraLivre}
          onChangeText={setPalavraLivre}
          placeholder=""
          placeholderTextColor="#888888"
          autoCapitalize="none"
        />

        <Pressable
          style={({ pressed }) => [
            styles.pillButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={handleConfirmar}
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
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#111111",
  },
});

export default QuizEscrita;
