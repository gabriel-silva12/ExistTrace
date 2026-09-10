import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import GridSelector, { GridItem } from "../components/GridSelector";

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

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Emoji</Text>
        <Text style={styles.subtitle}>Selecione um emoji:</Text>

        {/* 2. Feed the explicit grid layout config down via props attribute */}
        <GridSelector items={dashboardTraces} />

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