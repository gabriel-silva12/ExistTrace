import { Href, useRouter } from "expo-router";
import { useState } from "react";
import {
    Button,
    Keyboard, //teclado
    KeyboardAvoidingView, //pro teclado nao cobri os inputs do login
    Platform, //android ou ios
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback, //fecha o teclado se clicar fora
    View
} from "react-native";
//array de telas, convertidos string para href, que é o tipo que o router aceita como argumento
const screens: Href[] = [
        "/login",
        "/screenA", 
        "/screenB", 
        "/screenC", 
        "/screenD", 
]


    
const LoginScreen = () => {
  const router = useRouter(); // para transitar entre paginas, roteamento

  //hook para limpar os campos
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  //acessa lista de tela e dependendo do argumento seleciona tela
  const getRoutebyIndex = (index : number): Href => {
    return screens[index] ?? "/login" // se index nao existe fallback é pagina de login
  }

  //handler prototipo de login
  const handleLogin = () => {
    console.log("Entrando com:", {email, password})
    
    //atribui a variavel o retorno do tipo correto da função que seleciona a tela    
    const nextRoute = getRoutebyIndex(1)
    //finalmente passa o argumento pro router mudar de tela..
    router.push(nextRoute)
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
                        placeholder="Email"
                        placeholderTextColor="#888888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888888"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true} 
                        autoCapitalize="none"
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Login" onPress={handleLogin} />
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
  buttonContainer: {
    width: "100%",
    marginTop: 8,
  },
});

export default LoginScreen;