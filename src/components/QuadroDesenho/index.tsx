import { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { DesenhoSalvo, Trace } from "@/components/Desenho/types";

const CORES = ["#111111", "#407FA0", "#d9534f", "#2e9e5b"];
const ESPESSURAS = [3, 6, 10];

type Medidas = { largura: number; altura: number };

type Props = {
  onChange?: (desenho: DesenhoSalvo) => void;
  instrucao?: string; // texto fantasma que some no primeiro toque
};

const QuadroDesenho = ({ onChange, instrucao }: Props) => {
  const [medidas, setMedidas] = useState<Medidas>({ largura: 0, altura: 0 });
  const [traces, setTraces] = useState<Trace[]>([]);
  const [atual, setAtual] = useState<string | null>(null);
  const [cor, setCor] = useState(CORES[0]);
  const [espessura, setEspessura] = useState(ESPESSURAS[1]);
  const [aberto, setAberto] = useState(false); // paleta aberta

  // opacidade da barra: 1 em repouso, 0 enquanto o dedo desenha
  const barra = useRef(new Animated.Value(1)).current;

  // o PanResponder é criado uma vez só, então lê esses valores por ref
  const estilo = useRef({ cor, espessura });
  estilo.current = { cor, espessura };
  const medidasRef = useRef<Medidas>({ largura: 0, altura: 0 });
  const caminho = useRef("");

  const mostrarBarra = (visivel: boolean) => {
    Animated.timing(barra, {
      toValue: visivel ? 1 : 0,
      duration: visivel ? 200 : 120,
      useNativeDriver: true,
    }).start();
  };

  const ponto = (x: number, y: number) => {
    const { largura, altura } = medidasRef.current;
    const cx = Math.min(Math.max(x, 0), largura);
    const cy = Math.min(Math.max(y, 0), altura);
    return `${Math.round(cx * 10) / 10} ${Math.round(cy * 10) / 10}`;
  };

  const finalizar = () => {
    mostrarBarra(true);
    if (!caminho.current) return;
    const novo: Trace = {
      d: caminho.current,
      cor: estilo.current.cor,
      espessura: estilo.current.espessura,
    };
    caminho.current = "";
    setAtual(null);
    setTraces((anteriores) => [...anteriores, novo]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: (evento) => {
        setAberto(false);
        mostrarBarra(false);
        const { locationX, locationY } = evento.nativeEvent;
        const p = ponto(locationX, locationY);
        caminho.current = `M${p} L${p}`; // um toque simples vira um ponto
        setAtual(caminho.current);
      },

      onPanResponderMove: (evento) => {
        const { locationX, locationY } = evento.nativeEvent;
        caminho.current += ` L${ponto(locationX, locationY)}`;
        setAtual(caminho.current);
      },

      onPanResponderRelease: finalizar,
      onPanResponderTerminate: finalizar,
    })
  ).current;

  // avisa a tela sempre que o desenho muda
  useEffect(() => {
    if (!medidas.largura) return;
    onChange?.({ largura: medidas.largura, altura: medidas.altura, traces });
  }, [traces, medidas]);

  const aoMedir = (evento: LayoutChangeEvent) => {
    const { width, height } = evento.nativeEvent.layout;
    const nova = { largura: Math.round(width), altura: Math.round(height) };
    medidasRef.current = nova;
    setMedidas(nova);
  };

  const vazio = traces.length === 0;

  return (
    <View style={styles.wrapper}>
      <View style={styles.quadro} onLayout={aoMedir} {...panResponder.panHandlers}>
        {/* pointerEvents none: o toque é lido pelo quadro, não pelo SVG */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {medidas.largura > 0 && (
            <Svg width={medidas.largura} height={medidas.altura}>
              {traces.map((t, i) => (
                <Path
                  key={i}
                  d={t.d}
                  stroke={t.cor}
                  strokeWidth={t.espessura}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {atual && (
                <Path
                  d={atual}
                  stroke={cor}
                  strokeWidth={espessura}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </Svg>
          )}
        </View>

        {/* texto fantasma: some no primeiro toque, sem mexer no tamanho do quadro */}
        {vazio && !atual && !!instrucao && (
          <View style={[StyleSheet.absoluteFill, styles.instrucaoArea]} pointerEvents="none">
            <Text style={styles.instrucao}>{instrucao}</Text>
          </View>
        )}

        {/* ferramentas dentro do quadro: somem enquanto o dedo desenha */}
        <Animated.View
          style={[styles.ferramentasArea, { opacity: barra }]}
          pointerEvents="box-none"
        >
          {aberto && (
            <View style={styles.painel}>
              <View style={styles.linhaPainel}>
                {CORES.map((c) => (
                  <Pressable
                    key={c}
                    onPress={() => setCor(c)}
                    hitSlop={4}
                    style={[styles.corAnel, cor === c && { borderColor: c }]}
                    accessibilityLabel="Escolher cor"
                  >
                    <View style={[styles.corPonto, { backgroundColor: c }]} />
                  </Pressable>
                ))}
              </View>

              <View style={styles.linhaPainel}>
                {ESPESSURAS.map((e) => (
                  <Pressable
                    key={e}
                    onPress={() => setEspessura(e)}
                    hitSlop={4}
                    style={[styles.espessuraAnel, espessura === e && styles.anelAtivo]}
                    accessibilityLabel="Escolher espessura"
                  >
                    <View
                      style={{
                        width: e * 2,
                        height: e * 2,
                        borderRadius: e,
                        backgroundColor: cor,
                      }}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View style={styles.barra}>
            <Pressable
              onPress={() => setAberto((a) => !a)}
              hitSlop={4}
              style={styles.icone}
              accessibilityLabel="Cores e espessura"
            >
              <View style={[styles.corAtual, { backgroundColor: cor }]} />
            </Pressable>

            <Pressable
              disabled={vazio}
              onPress={() => setTraces((anteriores) => anteriores.slice(0, -1))}
              hitSlop={4}
              style={[styles.icone, vazio && styles.desabilitado]}
              accessibilityLabel="Desfazer"
            >
              <MaterialCommunityIcons name="undo-variant" size={24} color="#407FA0" />
            </Pressable>

            <Pressable
              disabled={vazio}
              onPress={() => setTraces([])}
              hitSlop={4}
              style={[styles.icone, vazio && styles.desabilitado]}
              accessibilityLabel="Limpar"
            >
              <MaterialCommunityIcons name="delete-outline" size={24} color="#407FA0" />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const VIDRO = "rgba(255, 255, 255, 0.94)";

const styles = StyleSheet.create({
  wrapper: { flex: 1, width: "100%" },
  quadro: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    overflow: "hidden",
  },
  instrucaoArea: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  instrucao: {
    fontSize: 22,
    textAlign: "center",
    color: "rgba(17, 17, 17, 0.3)",
  },

  // fica no canto inferior esquerdo; a seta de prosseguir fica no direito
  ferramentasArea: {
    position: "absolute",
    left: 12,
    bottom: 18,
    alignItems: "flex-start",
  },
  barra: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 6,
    borderRadius: 26,
    backgroundColor: VIDRO,
    borderWidth: 1,
    borderColor: "rgba(17, 17, 17, 0.08)",
    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  painel: {
    marginBottom: 8,
    padding: 10,
    gap: 8,
    borderRadius: 22,
    backgroundColor: VIDRO,
    borderWidth: 1,
    borderColor: "rgba(17, 17, 17, 0.08)",
    shadowColor: "#185366",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  linhaPainel: { flexDirection: "row", alignItems: "center", gap: 4 },

  icone: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  corAtual: { width: 26, height: 26, borderRadius: 13 },
  desabilitado: { opacity: 0.3 },

  corAnel: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  corPonto: { width: 24, height: 24, borderRadius: 12 },
  espessuraAnel: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  anelAtivo: { borderColor: "#407FA0" },
});

export default QuadroDesenho;