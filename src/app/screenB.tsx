import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const ScreenB = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3 - Screen B</Text>
      <Button title="Go to Screen C" onPress={() => router.push("/screenC")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e8f5e9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default ScreenB;