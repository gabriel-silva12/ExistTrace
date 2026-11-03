import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ETAPAS = [
  {
    titulo: "Emoji",
    texto:
      "O paciente escolhe o emoji que melhor representa como ele se sente no momento. É uma forma rápida e intuitiva de expressar o estado emocional.",
  },
  {
    titulo: "Palavra",
    texto:
      "Em seguida, o paciente seleciona uma palavra que descreve melhor esse sentimento, dando mais precisão ao que foi escolhido no emoji.",
  },
  {
    titulo: "Escrita livre",
    texto:
      "O paciente escreve com as próprias palavras o que está pensando ou sentindo, sem formato definido. Ajuda a identificar pensamentos automáticos.",
  },
  {
    titulo: "Desenho",
    texto:
      "Por último, o paciente pode desenhar livremente. É um recurso para expressar o que é difícil de colocar em palavras.",
  },
];

const EtapasDoTeste = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.back}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#2f8f9e" />
        </Pressable>

        <Text style={styles.title}>Etapas do teste</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Visão geral</Text>
          <Text style={styles.body}>
            O teste é aplicado durante a sessão e tem {ETAPAS.length} etapas.
            Cada uma registra o estado emocional do paciente de uma forma
            diferente, e o conjunto fica salvo no histórico para
            acompanhamento do profissional.
          </Text>
        </View>

        {ETAPAS.map((etapa, i) => (
          <View key={etapa.titulo} style={styles.card}>
            <View style={styles.stepHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepTitle}>{etapa.titulo}</Text>
            </View>
            <Text style={styles.body}>{etapa.texto}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  back: { marginBottom: 8, alignSelf: "flex-start" },
  title: { fontSize: 24, fontWeight: "600", color: "#1a1a1a", marginBottom: 20 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  heading: { fontSize: 17, fontWeight: "600", color: "#3e6e82", marginBottom: 8 },
  body: { fontSize: 16, lineHeight: 24, color: "#1a1a1a" },
  stepHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3e6e82",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  badgeText: { color: "#ffffff", fontSize: 14, fontWeight: "bold" },
  stepTitle: { fontSize: 17, fontWeight: "600", color: "#3e6e82" },
});

export default EtapasDoTeste;