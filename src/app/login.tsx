import { Href, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
enum screens {
    "/screenA" =1,
    "/screenB" =2,
    "/screenC" =3,
    "/screenD" =4,
  }
    
const LoginScreen = () => {
  const router = useRouter(); // para transitar entre paginas
  
  //magiaescura
  const goToNextScreen = (nextScreen :screens) => {
        const route = screens[nextScreen] as string
        router.push(route as Href)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1 - Login Screen</Text>
      <Button title="Login" onPress={() => goToNextScreen(1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default LoginScreen;