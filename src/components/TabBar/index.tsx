import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { useRouter } from "expo-router";
import {
  Alert,
  Animated,
  LayoutChangeEvent,
  PanResponder,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics"

import styles from "./styles";
import { Propiedades } from "./types";

type NomeIcone = ComponentProps<typeof MaterialCommunityIcons>["name"];
type Aba = NonNullable<Propiedades["activeTab"]>;

const MARGEM = 6; // folga da pílula dentro de cada zona
const COR_ATIVA = "#3e6e82";
const COR_INATIVA = "rgba(255, 255, 255, 0.78)";

const abas: {
  chave: Aba;
  rotulo: string;
  icone: NomeIcone;
  iconeAtivo: NomeIcone;
}[] = [
  { chave: "home", rotulo: "Início", icone: "home-outline", iconeAtivo: "home" },
  {
    chave: "pacientes",
    rotulo: "Pacientes",
    icone: "account-group-outline",
    iconeAtivo: "account-group",
  },
  {
    chave: "configuracoes",
    rotulo: "Ajustes",
    icone: "cog-outline",
    iconeAtivo: "cog",
  },
];

// descobre qual aba está sob o dedo, dividindo a barra em partes iguais
const abaNaPosicao = (x: number, inicio: number, largura: number): Aba | null => {
  if (!largura) return null;
  const indice = Math.floor(((x - inicio) / largura) * abas.length);
  const limitado = Math.min(Math.max(indice, 0), abas.length - 1);
  return abas[limitado].chave;
};

const Conteudo = ({
  icone,
  rotulo,
  cor,
}: {
  icone: NomeIcone;
  rotulo: string;
  cor: string;
}) => (
  <View style={styles.conteudoAba}>
    <MaterialCommunityIcons name={icone} size={22} color={cor} />
    <Text style={[styles.rotulo, { color: cor }]}>{rotulo}</Text>
  </View>
);

const TabBar = ({ activeTab = "home" }: Propiedades) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // aba sob o dedo enquanto o gesto está ativo (null = sem toque)
  const [hover, setHover] = useState<Aba | null>(null);
  const hoverRef = useRef<Aba | null>(null);
  const containerRef = useRef<View>(null);
  const geometria = useRef({ x: 0, largura: 0 });

  // animação: posição e tamanho da pílula, e "quanto cada aba está ativa" (0 a 1)
  const x = useRef(new Animated.Value(0)).current;
  const escala = useRef(new Animated.Value(1)).current;
  const [progresso] = useState(() =>
    abas.map((a) => new Animated.Value(a.chave === activeTab ? 1 : 0))
  );
  const [larguraTrilho, setLarguraTrilho] = useState(0);
  const posicionado = useRef(false);

  const zona = larguraTrilho / abas.length;
  const destaque = hover ?? activeTab;
  const indiceDestaque = abas.findIndex((a) => a.chave === destaque);

  // desliza a pílula e troca o cross-fade dos ícones quando o destaque muda
  useEffect(() => {
    if (!larguraTrilho) return;
    const alvo = indiceDestaque * zona + MARGEM;

    if (!posicionado.current) {
      // primeira vez: já nasce no lugar certo, sem animar
      x.setValue(alvo);
      posicionado.current = true;
    } else {
      Animated.spring(x, {
        toValue: alvo,
        damping: 18,
        stiffness: 220,
        mass: 0.9,
        useNativeDriver: true,
      }).start();
    }

    abas.forEach((_, i) => {
      Animated.timing(progresso[i], {
        toValue: i === indiceDestaque ? 1 : 0,
        duration: 160,
        useNativeDriver: true,
      }).start();
    });
  }, [indiceDestaque, larguraTrilho]);

  const aoMedirTrilho = (e: LayoutChangeEvent) => {
    setLarguraTrilho(e.nativeEvent.layout.width);
  };

  const atualizarHover = (chave: Aba | null) => {
    if (hoverRef.current === chave) return;
    hoverRef.current = chave;
    setHover(chave);
    if (chave) Haptics.selectionAsync()
  };

  // a pílula "cresce" enquanto o dedo segura e volta ao soltar
  const crescer = () =>
    Animated.spring(escala, {
      toValue: 1.06,
      speed: 40,
      bounciness: 8,
      useNativeDriver: true,
    }).start();

  const encolher = () =>
    Animated.spring(escala, {
      toValue: 1,
      speed: 40,
      bounciness: 8,
      useNativeDriver: true,
    }).start();

  const aoSelecionar = (chave: Aba) => {
    if (chave === activeTab) return;

    if (chave === "home") router.replace("/dashboard");
    else if (chave === "pacientes") router.replace("/pacientes");
    else Alert.alert("Em breve", "Tela de configurações ainda não disponível.");
  };

  // o PanResponder é criado uma vez, então ele lê a versão mais recente por ref
  const aoSelecionarRef = useRef(aoSelecionar);
  aoSelecionarRef.current = aoSelecionar;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: (evt) => {
        crescer();
        const toqueX = evt.nativeEvent.pageX;
        // mede a barra no momento do toque para saber onde ela começa na tela
        containerRef.current?.measureInWindow((posX, _y, largura) => {
          geometria.current = { x: posX, largura };
          atualizarHover(abaNaPosicao(toqueX, posX, largura));
        });
      },

      onPanResponderMove: (_, gesture) => {
        const { x: posX, largura } = geometria.current;
        atualizarHover(abaNaPosicao(gesture.moveX, posX, largura));
      },

      // soltou o dedo: navega para a aba que estava sob ele
      onPanResponderRelease: () => {
        encolher();
        const escolhida = hoverRef.current;
        atualizarHover(null);
        if (escolhida) aoSelecionarRef.current(escolhida);
      },

      onPanResponderTerminate: () => {
        encolher();
        atualizarHover(null);
      },
    })
  ).current;

  return (
    <View
      ref={containerRef}
      style={[styles.container, { bottom: Math.max(insets.bottom - 8, 8) }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.trilho} onLayout={aoMedirTrilho}>
        {/* a pílula única que desliza entre as abas */}
        {larguraTrilho > 0 && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pilula,
              {
                width: zona - MARGEM * 2,
                transform: [{ translateX: x }, { scale: escala }],
              },
            ]}
          />
        )}

        {abas.map((aba, i) => {
          const p = progresso[i];

          return (
            <View
              key={aba.chave}
              style={styles.zona}
              accessible
              accessibilityRole="button"
              accessibilityLabel={aba.rotulo}
              accessibilityState={{ selected: aba.chave === activeTab }}
              accessibilityActions={[{ name: "activate" }]}
              onAccessibilityAction={() => aoSelecionar(aba.chave)}
            >
              <View>
                {/* camada inativa: ícone vazado em branco */}
                <Animated.View
                  style={{
                    opacity: p.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  }}
                >
                  <Conteudo icone={aba.icone} rotulo={aba.rotulo} cor={COR_INATIVA} />
                </Animated.View>

                {/* camada ativa: ícone cheio em azul, sobre a pílula branca */}
                <Animated.View style={[styles.camadaTopo, { opacity: p }]}>
                  <Conteudo icone={aba.iconeAtivo} rotulo={aba.rotulo} cor={COR_ATIVA} />
                </Animated.View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;