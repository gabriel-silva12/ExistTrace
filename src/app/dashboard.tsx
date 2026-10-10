import { useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";

import { useAuth } from "@/hooks/context/AuthContext";

const Dashboard = () => {
  const router = useRouter();
  const { perfil } = useAuth();
  const nomeExibido = perfil?.nome || "Psicólogo";

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerBlob} />
          <Text style={styles.headerGreeting}>Bem-vindo</Text>
          <Text style={styles.headerName}>{nomeExibido}</Text>

          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons name="account" size={30} color="#ffffff" />
          </View>
        </View>

        <View style={styles.sessionCard}>
          <Text style={styles.sessionTitle}>
            Terapia Cognitivo-{"\n"}Comportamental
          </Text>

          {/* TODO: placeholder - trocar pela ilustração final */}
          <View style={styles.illustrationPlaceholder} />

          

           {/*Não é ideal iniciar teste por essa tela senão vai chegar no banco de dados sem um id de paciente definido, undefined */}
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && { opacity: 0.85 },
            ]}
            onPress={() => router.push("/quiz-emoji")}
          >
            <Text style={styles.startButtonText}>Iniciar</Text>
          </Pressable>
          

        </View>
            
        <Pressable style={({ pressed }) => [styles.infoCard, pressed && { opacity: 0.8 }]}>
          <Text style={styles.infoCardText}>
            O que é a terapia{"\n"}cognitivo-comportamental?
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#2f8f9e" />
        </Pressable>

        <Pressable style={({ pressed }) => [styles.infoCard, pressed && { opacity: 0.8 }]}>
          <Text style={styles.infoCardText}>
            Informações sobre{"\n"}etapas do teste
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#2f8f9e" />
        </Pressable>
      </ScrollView>

      {/* TODO: trocar os MaterialCommunityIcons abaixo pelos ícones do Flaticon
          (ex: <Image source={require("../../assets/images/icons/home.png")} style={styles.tabIcon} />) */}
      <TabBar activeTab="home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf3f6",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: "#3e6e82",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 70,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  headerBlob: {
    position: "absolute",
    right: -40,
    top: 20,
    width: 160,
    height: 160,
    borderRadius: 75,
    backgroundColor: "#3e6e82",
    opacity: 0.0,
  },
  headerGreeting: {
    fontSize: 26,
    color: "#ffffff",
    fontWeight: "400",
  },
  headerName: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "bold",
  },
  avatarCircle: {
    position: "absolute",
    right: 16,
    top: 66,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center",
  },
  sessionCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: -48,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sessionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 20,
  },
  illustrationPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#8fbfa0",
    borderRadius: 16,
    marginBottom: 20,
  },
  startButton: {
    display: "none",
    width: "100%",
    height: 52,
    backgroundColor: "#3e6e82",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  infoCardText: {
    fontSize: 16,
    color: "#1a1a1a",
    flex: 1,
    marginRight: 12,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});

export default Dashboard;