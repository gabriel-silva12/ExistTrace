import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GridItem } from "../components/GridSelector";

const screens: Href[] = ["/login", "/screenA", "/screenB", "/screenC", "/screenD"];

// 1. Dashboard specific choices
const dashboardTraces: GridItem[] = [
  { id: "1", subtitle: "Amor"},
  { id: "2", subtitle: "Paz"},
  { id: "3", subtitle: "Verdade"},
  { id: "4", subtitle: "Honestidade" },
];

const ScreenC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Agora é sua vez</Text>
        <Text style={styles.subtitle}>Escreva uma palavra:</Text>

                            <TextInput
                                style={styles.input}
                                placeholder=""
                                placeholderTextColor="#888888"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

        <Pressable 
          style={({ pressed }) => [styles.pillButton, pressed && { opacity: 0.8 }]} 
          onPress={() => router.push("/screenD")}
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
});

export default ScreenC;