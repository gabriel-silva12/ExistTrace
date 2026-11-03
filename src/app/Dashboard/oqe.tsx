import { Stack, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OQueE = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.back}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#2f8f9e" />
        </Pressable>

        <Text style={styles.title}>O que é a terapia cognitivo-comportamental?</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Ideia central</Text>
          <Text style={styles.body}>
            lorem ipsum de coisas que vou escrever depois
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Como funciona</Text>
          <Text style={styles.body}>
            É uma terapia estruturada e focada no presente, em que paciente e
            terapeuta identificam padrões de pensamento e testam alternativas.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>O que é reatividade</Text>
          <Text style={styles.body}>
            Reatividade é a intensidade e a rapidez com que uma pessoa responde
            emocionalmente a um estímulo ou situação.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>nao sei</Text>
          <Text style={styles.body}>
           lorem ipsum de coisas que vou escrever depois
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  back: { marginBottom: 8, alignSelf: "flex-start" },
  title: { fontSize: 24, fontWeight: "600", color: "#1a1a1a", marginBottom: 20 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  heading: { fontSize: 17, fontWeight: "600", color: "#3e6e82", marginBottom: 8 },
  body: { fontSize: 16, lineHeight: 24, color: "#1a1a1a" },
});

export default OQueE;