import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const ScreenC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>4 - Screen C</Text>
      <Button title="Go to Screen D" onPress={() => router.push("/screenD")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff3e0" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default ScreenC;