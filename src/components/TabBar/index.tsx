import { useRef, useState } from "react";
import type { ComponentProps } from "react";
import { useRouter } from "expo-router";
import { Alert, PanResponder, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import { Propiedades } from "./types";

type NomeIcone = ComponentProps<typeof MaterialCommunityIcons>["name"];
type Aba = NonNullable<Propiedades["activeTab"]>;

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

const TabBar = ({ activeTab = "home" }: Propiedades) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // aba sob o dedo enquanto o gesto está ativo (null = sem toque)
  const [hover, setHover] = useState<Aba | null>(null);
  const hoverRef = useRef<Aba | null>(null);
  const containerRef = useRef<View>(null);
  const geometria = useRef({ x: 0, largura: 0 });

  const atualizarHover = (chave: Aba | null) => {
    if (hoverRef.current === chave) return;
    hoverRef.current = chave;
    setHover(chave);
  };

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
        const toqueX = evt.nativeEvent.pageX;
        // mede a barra no momento do toque para saber onde ela começa na tela
        containerRef.current?.measureInWindow((x, _y, largura) => {
          geometria.current = { x, largura };
          atualizarHover(abaNaPosicao(toqueX, x, largura));
        });
      },

      onPanResponderMove: (_, gesture) => {
        const { x, largura } = geometria.current;
        atualizarHover(abaNaPosicao(gesture.moveX, x, largura));
      },

      // soltou o dedo: navega para a aba que estava sob ele
      onPanResponderRelease: () => {
        const escolhida = hoverRef.current;
        atualizarHover(null);
        if (escolhida) aoSelecionarRef.current(escolhida);
      },

      onPanResponderTerminate: () => atualizarHover(null),
    })
  ).current;

  const destaque = hover ?? activeTab;

  return (
    <View
      ref={containerRef}
      style={[styles.container, { bottom: insets.bottom - 8 }]}
      {...panResponder.panHandlers}
    >
      {abas.map((aba) => {
        const ativa = aba.chave === destaque;

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
            <View style={[styles.aba, ativa && styles.abaAtiva]}>
              <MaterialCommunityIcons
                name={ativa ? aba.iconeAtivo : aba.icone}
                size={24}
                color={ativa ? "#3e6e82" : "#ffffff"}
              />
              {ativa && <Text style={styles.rotulo}>{aba.rotulo}</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default TabBar;