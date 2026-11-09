import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OQueE = () => {
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

        <Text style={styles.title}>O que é a terapia cognitivo-comportamental?</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Ideia central</Text>
          <Text style={styles.body}>
            A terapia cognitivo-comportamental (TCC) é uma abordagem estruturada
            que busca identificar e modificar padrões de pensamentos e estados
            emocionais. Nomear esses estados faz parte da condução das sessões e
            do acompanhamento da evolução do paciente.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Como funciona</Text>
          <Text style={styles.body}>
            É uma terapia estruturada e focada no presente, em que paciente e
            terapeuta identificam padrões de pensamento e testam alternativas.
            Saber como o paciente se sente em cada sessão permite ajustar as
            intervenções e avaliar a resposta ao tratamento.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Automonitoramento</Text>
          <Text style={styles.body}>
            É o procedimento em que o próprio paciente observa e registra aspectos
            da sua experiência, o que favorece a consciência sobre seus estados
            internos. No ExistTrace, isso acontece em quatro etapas: emojis,
            palavra, escrita livre e desenho livre.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>O que é reatividade</Text>
          <Text style={styles.body}>
            Reatividade é o efeito pelo qual o próprio ato de registrar uma
            experiência pode modificá-la. Por isso o automonitoramento também
            serve como recurso terapêutico, e não só como coleta de dados. Pelo
            mesmo motivo, o registro não deve ser lido como uma medida neutra do
            estado emocional.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Diferenciação emocional</Text>
          <Text style={styles.body}>
            Também chamada de granularidade emocional, é a capacidade de nomear
            emoções com precisão e está associada à melhor regulação emocional e
            ao bem-estar. Por isso os emojis e as palavras são sorteados a cada
            aplicação: isso convida o paciente a se expressar fora do repertório
            habitual.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Registro idiográfico</Text>
          <Text style={styles.body}>
            Como os estímulos variam a cada aplicação, o histórico não serve para
            comparar números entre sessões. Ele deve ser interpretado pelo
            psicólogo, junto com o relato do paciente e o contexto clínico do caso
            individual.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Papel do aplicativo</Text>
          <Text style={styles.body}>
            O ExistTrace é uma ferramenta de apoio e de uso mediado pelo
            psicólogo, aplicada quando ele julgar pertinente. Ele não faz
            diagnósticos, não gera interpretações clínicas automáticas e não
            substitui a atuação profissional.
          </Text>
        </View>
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
});

export default OQueE;