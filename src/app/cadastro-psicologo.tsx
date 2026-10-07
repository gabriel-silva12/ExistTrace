import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import your existing auth hook
import { useAuth } from "@/hooks/context/AuthContext";

const SignupScreen = () => {
  const router = useRouter();

  const [nome, setNome] = useState("") //estado para armazenar nome
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);

  const { cadastrarComSupabase, loading } = useAuth();

  const handleSignup = async () => {
    // Validacao bascia
    if (!nome || !email || !password || !confirmPassword) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos.");
      return;
    }

    // 2. valida senha
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // 3. comprimento da senha (mínimo padrão é 6 caracteres)
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      await cadastrarComSupabase(nome, email, password);

      Alert.alert(
        "Sucesso!",
        "Conta criada com sucesso. Verifique seu e-mail se necessário.",
        [{ text: "OK", onPress: () => router.push("/login") }]
      );
    } catch (error: any) {
      Alert.alert("Erro no cadastro", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/LogoClaraExistTrace.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <Image
            source={require("../../assets/images/LetraClaraExistTrace.png")}
            style={styles.wordmark}
            contentFit="contain"
          />
        </View>

        <View style={{ width: "100%" }}>
          <Text style={styles.title}>Criar conta</Text>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="account-outline" size={20} color="#7c8798" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#7c8798"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#7c8798" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#7c8798"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="lock-outline" size={20} color="#7c8798" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#7c8798"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!senhaVisivel}
              autoCapitalize="none"
              editable={!loading}
            />
            <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)} hitSlop={8}>
              <MaterialCommunityIcons
                name={senhaVisivel ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#7c8798"
              />
            </Pressable>
          </View>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="lock-check-outline" size={20} color="#7c8798" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#7c8798"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmSenhaVisivel}
              autoCapitalize="none"
              editable={!loading}
            />
            <Pressable onPress={() => setConfirmSenhaVisivel(!confirmSenhaVisivel)} hitSlop={8}>
              <MaterialCommunityIcons
                name={confirmSenhaVisivel ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#7c8798"
              />
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.pillButton,
              pressed && { opacity: 0.8 }
            ]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.pillButtonText}>Cadastrar</Text>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
            onPress={() => router.push("/login")}
            disabled={loading}
          >
            <Text style={styles.signupText}>
              Já tem uma conta? <Text style={styles.signupLink}>Entrar</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f2e"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 10,
  },
  wordmark: {
    width: 150,
    height: 34,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#c3c9d6",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#3a4157",
    paddingBottom: 10,
    marginBottom: 18,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    paddingVertical: 4,
  },
  pillButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#3d4a68",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#9aa2b3",
    fontSize: 13,
  },
  signupLink: {
    color: "#2fb7c9",
    fontWeight: "bold",
  },
});

export default SignupScreen;