import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/services/supabase";

const RecuperarSenhaScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();

  const [etapa, setEtapa] = useState<"email" | "codigo">("email");
  const [email, setEmail] = useState(params.email ?? "");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmVisivel, setConfirmVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  const enviarCodigo = async () => {
    if (!email.trim()) {
      Alert.alert("Aviso", "Informe o e-mail.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);

    if (error) {
      Alert.alert("Erro", error.message);
      return;
    }
    // O Supabase não revela se o e-mail existe, então a mensagem é sempre genérica
    Alert.alert("Verifique seu e-mail", "Se o e-mail estiver cadastrado, enviamos um código.");
    setEtapa("codigo");
  };

  const redefinirSenha = async () => {
    if (!codigo.trim() || !novaSenha || !confirmar) {
      Alert.alert("Aviso", "Preencha o código e a nova senha.");
      return;
    }
    if (novaSenha.length < 6) {
      Alert.alert("Aviso", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmar) {
      Alert.alert("Aviso", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      // 1) valida o código (cria uma sessão temporária de recuperação)
      const { error: erroOtp } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: codigo.trim(),
        type: "recovery",
      });
      if (erroOtp) throw erroOtp;

      // 2) define a nova senha
      const { error: erroSenha } = await supabase.auth.updateUser({ password: novaSenha });
      if (erroSenha) throw erroSenha;

      // 3) encerra a sessão para o usuário entrar com a nova senha
      await supabase.auth.signOut();

      Alert.alert("Pronto", "Senha alterada com sucesso.");
      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Erro", e.message ?? "Não foi possível redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/LetraClaraExistTrace.png")}
            style={styles.wordmark}
            contentFit="contain"
          />
        </View>

        <View style={{ width: "100%" }}>
          <Text style={styles.title}>Recuperar senha</Text>
          <Text style={styles.description}>
            {etapa === "email"
              ? "Informe seu e-mail para receber um código."
              : "Digite o código recebido e escolha a nova senha."}
          </Text>

          {etapa === "email" && (
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
          )}

          {etapa === "codigo" && (
            <>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="numeric" size={20} color="#7c8798" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Código"
                  placeholderTextColor="#7c8798"
                  value={codigo}
                  onChangeText={setCodigo}
                  keyboardType="number-pad"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="lock-outline" size={20} color="#7c8798" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Nova senha"
                  placeholderTextColor="#7c8798"
                  value={novaSenha}
                  onChangeText={setNovaSenha}
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
                  placeholder="Confirmar nova senha"
                  placeholderTextColor="#7c8798"
                  value={confirmar}
                  onChangeText={setConfirmar}
                  secureTextEntry={!confirmVisivel}
                  autoCapitalize="none"
                  editable={!loading}
                />
                <Pressable onPress={() => setConfirmVisivel(!confirmVisivel)} hitSlop={8}>
                  <MaterialCommunityIcons
                    name={confirmVisivel ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#7c8798"
                  />
                </Pressable>
              </View>
            </>
          )}

          <Pressable
            style={({ pressed }) => [styles.pillButton, pressed && { opacity: 0.8 }]}
            onPress={etapa === "email" ? enviarCodigo : redefinirSenha}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.pillButtonText}>
                {etapa === "email" ? "Enviar código" : "Redefinir senha"}
              </Text>
            )}
          </Pressable>

          {etapa === "codigo" && (
            <Pressable onPress={enviarCodigo} disabled={loading}>
              <Text style={styles.resendText}>Reenviar código</Text>
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
            onPress={() => router.push("/login")}
            disabled={loading}
          >
            <Text style={styles.signupText}>
              Lembrou a senha? <Text style={styles.signupLink}>Entrar</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0f2e" },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  logoContainer: { alignItems: "center", marginBottom: 28 },
  wordmark: { width: 160, height: 36, marginBottom: 10, paddingBottom: 100 },
  title: { fontSize: 26, fontWeight: "600", color: "#c3c9d6", marginBottom: 8 },
  description: { color: "#9aa2b3", fontSize: 14, marginBottom: 24 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#3a4157",
    paddingBottom: 10,
    marginBottom: 18,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#ffffff", paddingVertical: 4 },
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
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  resendText: { textAlign: "center", color: "#7d9bd6", fontSize: 13, marginBottom: 16 },
  signupText: { textAlign: "center", color: "#9aa2b3", fontSize: 13 },
  signupLink: { color: "#2fb7c9", fontWeight: "bold" },
});

export default RecuperarSenhaScreen;