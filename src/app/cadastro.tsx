import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";

// Import your existing auth hook
import { useAuth } from "@/hooks/useAuth";

const SignupScreen = () => {
  const router = useRouter();
  
  const [nome, setNome] = useState("") //estado para armazenar nome
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={{ width: "100%", transform: [{ translateY: 25 }] }}>
            <Text style={styles.title}>Criar Conta</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#888888"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words" //capitaliza primeira letra de cada palavra
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#888888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#888888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              placeholderTextColor="#888888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              editable={!loading}
            />

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
              style={({ pressed }) => [
                styles.pillButtonOutline,
                pressed && { opacity: 0.6 }
              ]}
              onPress={() => router.push("/login")}
              disabled={loading}
            >
              <Text style={styles.pillButtonOutlineText}>Já tenho uma conta</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#111111",
    alignSelf: "flex-start"
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#111111",
  },
  pillButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#6c74de",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  pillButtonOutline: {
    width: "100%",
    height: 48,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "#6c74de",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pillButtonOutlineText: {
    color: "#6c74de",
    fontSize: 14,
    fontWeight: "bold",
  }
});

export default SignupScreen;