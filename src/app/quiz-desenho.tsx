import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import QuadroDesenho from "@/components/QuadroDesenho";
import { useQuiz } from "@/hooks/context/QuizContext";

const QuizDesenho = () => {
    const router = useRouter()
    const { pacienteId, emoji, palavraFixa, palavraLivre} = useLocalSearchParams<{
        pacienteId: string,
        emoji: string,
        palavraFixa: string,
        palavraLivre:string
    }>()

    const {desenho, setDesenho} = useQuiz()
    const temDesenho = !!desenho && desenho.traces.length > 0

    const continuar = () => {
  
        router.push({
            pathname: "/confirmar-quiz",
            params: { pacienteId, emoji, palavraFixa, palavraLivre }
        })
    }

    return(
        <View style={styles.container}>
            <Stack.Screen options={{ gestureEnabled: false }} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Desenho Livre</Text>
                <Text style={styles.subtitle}>Desenhe qualquer coisa que estiver passando pela sua cabeça</Text>

                <QuadroDesenho onChange={setDesenho}>
                </QuadroDesenho>

                <Pressable
                style={[styles.pillButton, !temDesenho && styles.pillButtonDisabled]}
                onPress={continuar}
                disabled={!temDesenho}>
                    <Text style={styles.pillButtonText}> Continuar </Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 0,
    width: "100%"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    alignSelf: "flex-start",
    marginBottom: 4,
    paddingTop: 80,
  },
  subtitle: {
    fontSize: 16,
    color: "#957878",
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  pillButton: {
    width: "44%",
    height: 48,
    backgroundColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  pillButtonDisabled: { backgroundColor: "#cccccc" },
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default QuizDesenho