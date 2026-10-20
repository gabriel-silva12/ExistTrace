
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
  pronto: boolean;
  onContinuar: () => void;
  confirmarSaida?: boolean;
  bloquearGestos?: boolean;
  telaCheia?: boolean;
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
  const entrada = useRef(new Animated.Value(0)).current;
  const escalaBotao = useRef(new Animated.Value(1)).current;

  useKeepAwake();

  // Entrada suave do conteúdo
  useEffect(() => {
    entrada.setValue(0);

    const animation = Animated.timing(entrada, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [entrada]);

  // Aparece e desaparece conforme a resposta fica pronta
  useEffect(() => {
    const animation = Animated.timing(opacidade, {
      toValue: pronto ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [pronto, opacidade]);

  const pedirConfirmacao = useCallback(() => {
    Alert.alert(
      "Sair do quiz?",
      "As respostas desta sessão não serão salvas.",
      [
        { text: "Continuar no quiz", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => router.back(),
        },
      ],
    );
  }, [router]);

  useFocusEffect(
    useCallback(() => {
      if (!confirmarSaida) return;

      const inscricao = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          pedirConfirmacao();
          return true;
        },
      );

      return () => inscricao.remove();
    }, [confirmarSaida, pedirConfirmacao]),
  );

  const travarGestos = bloquearGestos ?? !!confirmarSaida;

  const pressionarBotao = () => {
    Animated.sequence([
      Animated.timing(escalaBotao, {
        toValue: 0.92,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(escalaBotao, {
        toValue: 1,
        useNativeDriver: true,
        speed: 24,
        bounciness: 4,
      }),
    ]).start();

    onContinuar();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar hidden />

      <Stack.Screen
        options={{
          animation: "fade",
          gestureEnabled: !travarGestos,
        }}
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
            : {
                paddingTop: insets.top + 24,
              },
        ]}
      >
        <Animated.View
          style={[
            styles.conteudoAnimado,
            {
              opacity: entrada,
              transform: [
                {
                  translateY: entrada.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>

      <View
        pointerEvents="box-none"
        style={
          telaCheia
            ? [
                styles.rodapeFlutuante,
                { bottom: insets.bottom + 24 },
              ]
            : [
                styles.rodape,
                { paddingBottom: insets.bottom + 20 },
              ]
        }
      >
        <Animated.View
          style={{
            opacity: opacidade,
            transform: [{ scale: escalaBotao }],
          }}
          pointerEvents={pronto ? "auto" : "none"}
        >
          <Pressable
            disabled={!pronto}
            onPress={pressionarBotao}
            style={({ pressed }) => [
              styles.botao,
              pressed && styles.botaoPressionado,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Continuar"
          >
            <MaterialCommunityIcons
              name="arrow-right"
              size={28}
              color="#FFFFFF"
            />
          </Pressable>
        </Animated.View>
      </View>

      {confirmarSaida && (
        <Pressable
          style={[
            styles.sair,
            { top: insets.top + 8 },
          ]}
          onPress={pedirConfirmacao}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Sair do quiz"
        >
          <MaterialCommunityIcons
            name="close"
            size={22}
            color="#45616F"
          />
        </Pressable>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf3f6",
  },

  conteudo: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  conteudoAnimado: {
    flex: 1,
    justifyContent: "center",
  },

  rodape: {
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 12,
  },

  rodapeFlutuante: {
    position: "absolute",
    right: 24,
  },

  botao: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3e6e82",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#28566D",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  botaoPressionado: {
    opacity: 0.85,
  },

  sair: {
    position: "absolute",
    left: 12,
    width: 32,
    height: 32,
    opacity: 0.3,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCE9EF",
  },
});

export default QuizScreen;
