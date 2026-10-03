import { Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView, //pro teclado nao cobri os inputs do login
  Platform,
  Pressable, //android ou ios
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Image } from "expo-image";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";


//middleware de autenticacao
import { useAuth } from "@/hooks/context/AuthContext";

//array de telas, convertidos string para href, que é o tipo que o router aceita como argumento
const screens: Href[] = [
        "/login",
        "/cadastro",
        "/screenA", 
        "/screenB", 
        "/screenC", 
        "/screenD", 
] as const //evita um erro futuro, mapeamento estatico?

const LoginScreen = () =>{
  const router = useRouter() //transicao entra paginas
  const [email, setEmail] = useState("") // email em branco
  const [password, setPassword] = useState("") //senha em branco
  const [senhaVisivel, setSenhaVisivel] = useState(false)
  const [lembrarDeMim, setLembrarDeMim] = useState(false)

  const { loginComSupabase, loading} = useAuth() // funcs do middelware

  const getRoutebyIndex = (index: number): Href => {
    return screens[index] ?? "/login"
  }

  const handleLogin = async () => {
      if (!email || !password) {
        Alert.alert("Aviso, por favor preencha o e-mail e a senha")
        return
      }
    //validacao de email/senha e troca de tela  
      try {
        const session = await loginComSupabase(email, password)
        if (session) {
          console.log("Conectao com sucesso")
          const nextRoute = getRoutebyIndex(2)
          router.push(nextRoute)
        }
      } catch (error: any) {
        Alert.alert("Erro no login", error.message)
      }


  }


  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
        <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    
                    <Image
                        source={require("../../assets/images/LetraClaraExistTrace.png")}
                        style={styles.wordmark}
                        contentFit="contain"
                    />
                </View>

                <View style={{ width: "100%" }}>
                    <Text style={styles.title}>Bem-vindo{"\n"}de volta</Text>

                    <View style={styles.inputWrapper}>
                        <MaterialCommunityIcons name="account-outline" size={20} color="#7c8798" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#7c8798"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading} // Bloqueia o campo enquanto carrega
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

                    <View style={styles.optionsRow}>
                        <Pressable style={styles.rememberRow} onPress={() => setLembrarDeMim(!lembrarDeMim)}>
                            <View style={[styles.checkbox, lembrarDeMim && styles.checkboxChecked]} />
                            <Text style={styles.rememberText}>Lembrar de mim</Text>
                        </Pressable>
                        <Pressable onPress={() => Alert.alert("Em breve", "Recuperação de senha ainda não disponível.")}>
                            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        style={({ pressed }) => [
                            styles.pillButton,
                            pressed && { opacity: 0.8 }
                        ]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                          <ActivityIndicator color="#ffffff"></ActivityIndicator>
                          ) : (
                          <Text style={styles.pillButtonText}>Entrar</Text>
                          )
                        }
                    </Pressable>

                    <Text style={styles.orText}>Ou entre com</Text>

                    <View style={styles.socialRow}>
                        <Pressable
                            style={({ pressed }) => [styles.socialButton, pressed && { opacity: 0.7 }]}
                            onPress={() => Alert.alert("Em breve", "Login com Google ainda não disponível.")}
                        >
                            <FontAwesome name="google" size={20} color="#ffffff" />
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [styles.socialButton, pressed && { opacity: 0.7 }]}
                            onPress={() => Alert.alert("Em breve", "Login com Apple ainda não disponível.")}
                        >
                            <FontAwesome name="apple" size={22} color="#ffffff" />
                        </Pressable>
                    </View>

                    <Pressable
                        style={({ pressed }) => [pressed && { opacity: 0.6 }]}
                        onPress={() => router.push("/cadastro")}
                        disabled={loading}
                    >
                        <Text style={styles.signupText}>
                            Não tem uma conta? <Text style={styles.signupLink}>Cadastre-se</Text>
                        </Text>
                    </Pressable>
                </View>
            </View>
    </KeyboardAvoidingView>
  )
}


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
    marginBottom: 36,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 12,
  },
  wordmark: {
    width: 220,
    height: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#c3c9d6",
    marginBottom: 28,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#3a4157",
    paddingBottom: 10,
    marginBottom: 20,
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
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#7c8798",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#2fb7c9",
    borderColor: "#2fb7c9",
  },
  rememberText: {
    color: "#9aa2b3",
    fontSize: 13,
  },
  forgotText: {
    color: "#7d9bd6",
    fontSize: 13,
  },
  pillButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#3d4a68",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    color: "#7c8798",
    fontSize: 13,
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1c2140",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
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

export default LoginScreen;