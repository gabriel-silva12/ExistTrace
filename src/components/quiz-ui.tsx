import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const cores = {
  header: "#3F7FA3",
  blob: "#81A9C3",
  fundo: "#EFF7FB",
  botao: "#0492AB",
  borda: "#8A9BA8",
  campo: "#BAD8E6",
  selecionado: "#D5EEF3",
  logoFundo: "#0F172A",
  logoIcone: "#00A3BF",
};

function iniciais(nome: string) {
  const partes = nome.trim().split(" ");
  return (partes[0]?.[0] ?? "" + (partes[1]?.[0] ?? "")).toUpperCase();
}

export function LogoCircle({ size = 124 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: cores.logoFundo,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* TODO: trocar pelo logo final do ExistTrace */}
      <MaterialCommunityIcons name="stethoscope" size={size * 0.55} color={cores.logoIcone} />
    </View>
  );
}

export function QuizHeader({ passo }: { passo: 1 | 2 | 3 }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.quizHeader, { paddingTop: insets.top + 16 }]}>
      <View style={s.blob} />
      {/* TODO: trocar pelo logo final do ExistTrace */}
      <MaterialCommunityIcons name="stethoscope" size={76} color="#fff" />
      <Text style={s.passoTexto}>Passo {passo} de 3</Text>
      <View style={s.dots}>
        {[1, 2, 3].map((n) => (
          <View key={n} style={[s.dot, n === passo && s.dotAtivo]} />
        ))}
      </View>
    </View>
  );
}

export function PacienteHeader({
  nome,
  idade,
  onVoltar,
}: {
  nome: string;
  idade?: string;
  onVoltar?: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.pacHeader, { paddingTop: insets.top + 16 }]}>
      <View style={s.blob} />
      {onVoltar && (
        <Pressable
          style={[s.voltar, { top: insets.top + 12 }]}
          onPress={onVoltar}
          hitSlop={10}
        >
          <MaterialCommunityIcons name="arrow-left" size={26} color="#fff" />
        </Pressable>
      )}
      <View style={s.pacTextos}>
        <Text style={s.pacNome} numberOfLines={2}>
          {nome}
        </Text>
        {idade ? <Text style={s.pacIdade}>Idade: {idade} anos</Text> : null}
      </View>
      <View style={s.pacAvatar}>
        <Text style={s.pacAvatarTexto}>{iniciais(nome)}</Text>
      </View>
    </View>
  );
}

export function PrimaryButton({
  titulo,
  onPress,
  desabilitado = false,
  style,
}: {
  titulo: string;
  onPress: () => void;
  desabilitado?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      disabled={desabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        s.botao,
        desabilitado && { opacity: 0.45 },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <Text style={s.botaoTexto}>{titulo}</Text>
    </Pressable>
  );
}

export type EmojiTipo = "neutro" | "triste" | "sereno" | "cansado";

export function EmojiFace({
  tipo,
  size = 100,
  selecionado = false,
}: {
  tipo: EmojiTipo;
  size?: number;
  selecionado?: boolean;
}) {
  const cinza = "#6F777C";
  const traco = Math.max(3, size * 0.035);
  const olhoFechado = tipo === "sereno" || tipo === "cansado";
  const olhoPonto = size * 0.14;
  const arcoW = size * 0.3;
  const arcoH = size * 0.15;

  const arcoBaixo: ViewStyle = {
    width: arcoW,
    height: arcoH,
    borderBottomWidth: traco,
    borderBottomLeftRadius: arcoW / 2,
    borderBottomRightRadius: arcoW / 2,
    borderColor: cinza,
  };
  const arcoCima: ViewStyle = {
    width: arcoW,
    height: arcoH,
    borderTopWidth: traco,
    borderTopLeftRadius: arcoW / 2,
    borderTopRightRadius: arcoW / 2,
    borderColor: cinza,
  };

  return (
    <View
      style={{
        width: size,
        height: size * 1.28,
        borderRadius: size * 0.35,
        borderWidth: 3,
        borderColor: selecionado ? cores.botao : cores.borda,
        backgroundColor: selecionado ? cores.selecionado : "#fff",
        alignItems: "center",
        paddingTop: size * 0.25,
      }}
    >
      <View style={{ flexDirection: "row", gap: size * 0.18, alignItems: "center" }}>
        {[0, 1].map((i) =>
          olhoFechado ? (
            <View key={i} style={arcoBaixo} />
          ) : (
            <View
              key={i}
              style={{
                width: olhoPonto,
                height: olhoPonto,
                borderRadius: olhoPonto / 2,
                backgroundColor: cinza,
              }}
            />
          )
        )}
      </View>
      <View style={{ marginTop: size * 0.28 }}>
        {tipo === "neutro" ? (
          <View
            style={{
              width: size * 0.48,
              height: traco,
              borderRadius: traco,
              backgroundColor: cinza,
            }}
          />
        ) : tipo === "sereno" ? (
          <View style={arcoBaixo} />
        ) : (
          <View style={arcoCima} />
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  blob: {
    position: "absolute",
    right: -60,
    top: -30,
    width: 220,
    height: 200,
    borderRadius: 100,
    backgroundColor: cores.blob,
  },
  quizHeader: {
    backgroundColor: cores.header,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: 24,
  },
  passoTexto: { color: "#fff", fontSize: 20, marginTop: 8 },
  dots: { flexDirection: "row", gap: 12, marginTop: 14 },
  dot: { width: 16, height: 16, borderRadius: 8, backgroundColor: cores.blob },
  dotAtivo: { backgroundColor: "#fff" },
  pacHeader: {
    backgroundColor: cores.header,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  voltar: { position: "absolute", left: 16 },
  pacTextos: { flex: 1, alignItems: "flex-end" },
  pacNome: { color: "#fff", fontSize: 32, fontWeight: "700", textAlign: "right" },
  pacIdade: { color: "#fff", fontSize: 20, marginTop: 4 },
  pacAvatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#FDEBAA",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  pacAvatarTexto: { fontSize: 28, fontWeight: "700", color: "#222233" },
  botao: {
    height: 56,
    borderRadius: 16,
    backgroundColor: cores.botao,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: { color: "#fff", fontSize: 20, fontWeight: "500" },
});