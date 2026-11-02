import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenHeader from "@/components/ScreenHeader";
import { cores } from "@/components/quiz-ui";

type Recurso = {
  icone: React.ComponentProps<typeof Feather>["name"];
  titulo: string;
  texto: string;
};

const RECURSOS: Recurso[] = [
  {
    icone: "clipboard",
    titulo: "Registro de estados emocionais",
    texto: "Registre como o paciente se sente ao longo das sessões de terapia.",
  },
  {
    icone: "trending-up",
    titulo: "Acompanhamento da evolução",
    texto: "Compare os registros entre sessões e observe mudanças ao longo do tempo.",
  },
  {
    icone: "users",
    titulo: "Apoio ao atendimento",
    texto: "Reúna as informações em um só lugar para apoiar o trabalho do profissional.",
  },
];

export default function SobreExistTrace() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScreenHeader
        titulo="O que é o ExistTrace"
        subtitulo=""
        mostrarAvatar={false}
        compacto
      />

      <ScrollView
        contentContainerStyle={[styles.conteudo, { paddingBottom: 24 + insets.bottom }]}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.voltar, pressed && styles.pressionado]}
        >
          <Feather name="arrow-left" size={18} color={cores.botao} />
          <Text style={styles.textoVoltar}>Voltar</Text>
        </Pressable>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>Sobre o app</Text>
          <Text style={styles.paragrafo}>
            O ExistTrace é um aplicativo para profissionais de saúde mental que ajuda a
            acompanhar os estados emocionais de pacientes durante o processo terapêutico.
          </Text>
          <Text style={styles.paragrafo}>
            Ele foi desenvolvido como projeto de conclusão de curso (TCC) no INESP.
          </Text>
        </View>

        <Text style={styles.secao}>O que você pode fazer</Text>
        <View style={styles.grupo}>
          {RECURSOS.map((r, i) => (
            <View key={r.titulo} style={[styles.recurso, i > 0 && styles.recursoBorda]}>
              <View style={styles.iconeBox}>
                <Feather name={r.icone} size={20} color={cores.botao} />
              </View>
              <View style={styles.recursoTextos}>
                <Text style={styles.recursoTitulo}>{r.titulo}</Text>
                <Text style={styles.recursoTexto}>{r.texto}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.aviso}>
          <Feather name="info" size={16} color="#6B7780" />
          <Text style={styles.textoAviso}>
            O ExistTrace é uma ferramenta de apoio e não substitui a avaliação clínica do
            profissional. O app está em fase de testes (beta).
          </Text>
        </View>

        <Text style={styles.versao}>
          Versão {Constants.expoConfig?.version ?? "0.0.0"}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingHorizontal: 12, paddingTop: 20 },
  pressionado: { opacity: 0.6 },

  voltar: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16 },
  textoVoltar: { fontSize: 15, fontWeight: "600", color: cores.botao },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 24,
    padding: 16,
    gap: 10,
  },
  tituloCard: { fontSize: 20, fontWeight: "700", color: "#111" },
  paragrafo: { fontSize: 15, lineHeight: 22, color: "#333" },

  secao: { fontSize: 18, fontWeight: "700", color: "#111", marginTop: 24, marginBottom: 10 },
  grupo: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 20,
    overflow: "hidden",
  },
  recurso: { flexDirection: "row", gap: 12, padding: 16, alignItems: "flex-start" },
  recursoBorda: { borderTopWidth: 1, borderTopColor: "#DDE3E8" },
  iconeBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF3F7",
    alignItems: "center",
    justifyContent: "center",
  },
  recursoTextos: { flex: 1 },
  recursoTitulo: { fontSize: 16, fontWeight: "700", color: "#111" },
  recursoTexto: { fontSize: 14, lineHeight: 20, color: "#6B7780", marginTop: 2 },

  aviso: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    marginTop: 24,
    paddingHorizontal: 4,
  },
  textoAviso: { flex: 1, fontSize: 13, lineHeight: 19, color: "#6B7780" },

  versao: { textAlign: "center", fontSize: 13, color: "#6B7780", marginTop: 18 },
});