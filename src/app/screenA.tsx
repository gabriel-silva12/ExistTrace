import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const ScreenA = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2 - Screen A</Text>
      <Button title="Go to Screen B" onPress={() => router.push("/screenB")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f4f8" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default ScreenA;