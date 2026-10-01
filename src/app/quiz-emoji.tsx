import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const ScreenD = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 - Screen D</Text>
      <Button title="Return to Login" onPress={() => router.replace("/login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffebee" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});

export default ScreenD;