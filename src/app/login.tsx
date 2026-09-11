import { Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Keyboard, //teclado
  KeyboardAvoidingView, //pro teclado nao cobri os inputs do login
  Platform,
  Pressable, //android ou ios
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback, //fecha o teclado se clicar fora
  View
} from "react-native";


//middleware de autenticacao
import { useAuth } from "@/hooks/useAuth";

//array de telas, convertidos string para href, que é o tipo que o router aceita como argumento
const screens: Href[] = [
        "/login",
        "/screenA", 
        "/screenB", 
        "/screenC", 
        "/screenD", 
]

const LoginScreen = () =>{
  const router = useRouter() //transicao entra paginas
  const [email, setEmail] = useState("") // email em branco
  const [password, setPassword] = useState("") //senha em branco

  const { loginComSupabase, loading} = useAuth() // funcs do middelware

  const getRoutebyIndex = (index: number): Href => {
    return screens[index] ?? "login"
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
          const nextRoute = getRoutebyIndex(1)
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
                <View style={{ width: "100%", transform: [{ translateY: 25 }] }}>
                    <Text style={styles.title}>
                        ExistTrace
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="E-mail"
                        placeholderTextColor="#888888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading} // Bloqueia o campo enquanto carrega
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
                            <View style={styles.buttonContainer}>
                                <Button title="Cadastrar"></Button>
                            </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}


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
    height: 54,                  // Total height constraint
    backgroundColor: "#6c74de",  // Sleek black accent color
    borderRadius: 20,            // Exact height divided by 2 creates the capsule shape
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 8,
  },
});

export default LoginScreen;