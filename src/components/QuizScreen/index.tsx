import { ReactNode, useCallback, useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  BackHandler,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useKeepAwake } from "expo-keep-awake";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  children: ReactNode;
  pronto: boolean; // há resposta: mostra o botão de prosseguir
  onContinuar: () => void;
  confirmarSaida?: boolean; // voltar exige confirmação (use na 1ª tela)
  bloquearGestos?: boolean; // desliga o arrastar para voltar (iOS)
  telaCheia?: boolean; // conteúdo ocupa a tela toda, botão flutua por cima
};

const QuizScreen = ({
  children,
  pronto,
  onContinuar,
  confirmarSaida,
  bloquearGestos,
  telaCheia,
}: Props) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const opacidade = useRef(new Animated.Value(0)).current;

  useKeepAwake(); // a tela não apaga enquanto o paciente responde

  // o botão aparece e some com fade, em vez de ficar sempre ali desabilitado
  useEffect(() => {
    Animated.timing(opacidade, {
      toValue: pronto ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [pronto]);

  const pedirConfirmacao = useCallback(() => {
    Alert.alert("Sair do quiz?", "As respostas desta sessão não serão salvas.", [
      { text: "Continuar no quiz", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: () => router.back() },
    ]);
  }, [router]);

  // botão voltar do Android: só vale enquanto ESTA tela está em foco
  // (a tela do emoji continua na pilha quando a da palavra abre)
  useFocusEffect(
    useCallback(() => {
      if (!confirmarSaida) return;

      const inscricao = BackHandler.addEventListener("hardwareBackPress", () => {
        pedirConfirmacao();
        return true; // bloqueia o voltar padrão
      });

      return () => inscricao.remove();
    }, [confirmarSaida, pedirConfirmacao])
  );

  // vale o que foi pedido; sem pedido, segue o confirmarSaida
  const travarGestos = bloquearGestos ?? !!confirmarSaida;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar hidden />
      <Stack.Screen
        options={{ animation: "fade", gestureEnabled: !travarGestos }}
      />

      <View
        style={[
          styles.conteudo,
          telaCheia
            ? {
                paddingTop: insets.top + 12,
                paddingBottom: insets.bottom + 12,
                paddingHorizontal: 12,
              }
            : { paddingTop: insets.top + 24 },
        ]}
      >
        {children}
      </View>

      <View
        pointerEvents="box-none"
        style={
          telaCheia
            ? [styles.rodapeFlutuante, { bottom: insets.bottom + 24 }]
            : [styles.rodape, { paddingBottom: insets.bottom + 20 }]
        }
      >
        <Animated.View
          style={{ opacity: opacidade }}
          pointerEvents={pronto ? "auto" : "none"}
        >
          <Pressable
            disabled={!pronto}
            onPress={onContinuar}
            style={({ pressed }) => [styles.botao, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
            accessibilityLabel="Continuar"
          >
            <MaterialCommunityIcons name="arrow-right" size={28} color="#ffffff" />
          </Pressable>
        </Animated.View>
      </View>

      {/* saída: X discreto no canto superior esquerdo */}
      {confirmarSaida && (
        <Pressable
          style={[styles.sair, { top: insets.top + 12 }]}
          onPress={pedirConfirmacao}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Sair do quiz"
        >
          <MaterialCommunityIcons name="close" size={24} color="#111111" />
        </Pressable>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  // rodapé no fluxo da tela: o teclado o empurra junto
  rodape: {
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  // modo tela cheia: a seta flutua sobre o conteúdo
  rodapeFlutuante: {
    position: "absolute",
    right: 24,
  },
  botao: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#407FA0",
    justifyContent: "center",
    alignItems: "center",
  },
  sair: {
    position: "absolute",
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.35,
  },
});

export default QuizScreen;