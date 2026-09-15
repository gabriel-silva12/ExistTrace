import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GridItem } from "../components/GridSelector";
//hook
import { useAuth } from "@/hooks/context/AuthContext";

const screens: Href[] = ["/login", "/screenA", "/screenB", "/screenC", "/screenD"];

// 1. Dashboard specific choices
const dashboardTraces: GridItem[] = [
  { id: "1", title: "🥳"},
  { id: "2", title: "😎"},
  { id: "3", title: "👽"},
  { id: "4", title: "💗" },
];

const ScreenA = () => {
  const router = useRouter();
  const { perfil } = useAuth() // captura perfil do hook
  const nomePsicologo = perfil?.nome.split( " " )[0] || "Psicólogo"
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bem-vindo, {nomePsicologo}</Text>
  

        <Pressable 
          style={({ pressed }) => [styles.pillButton, pressed && { opacity: 0.8 }]} 
          onPress={() => router.push("/screenB")}
        >
          <Text style={styles.pillButtonText}>Confirmar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  contentContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  title: { fontSize: 32, fontWeight: "bold", color: "#111111", alignSelf: "flex-start", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "#666666", alignSelf: "flex-start", marginBottom: 32 },
  pillButton: { width: "100%", height: 54, backgroundColor: "#0066cc", borderRadius: 27, justifyContent: "center", alignItems: "center" },
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default ScreenA;