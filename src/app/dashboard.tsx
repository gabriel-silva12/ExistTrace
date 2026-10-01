import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/hooks/context/AuthContext";
import { usePacientes } from "@/hooks/usePacientes";
import PacienteCard from "@/components/PacienteCard";

const Dashboard = () => {
  const router = useRouter();
  const { perfil } = useAuth();
  const { pacientes, carregando } = usePacientes();
  const nomePsicologo = perfil?.nome.split(" ")[0] || "Psicólogo";

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bem-vindo, {nomePsicologo}</Text>
        <Text style={styles.meusPacientes}>Meus Pacientes</Text>

        {carregando ? (
          <Text>Carregando pacientes...</Text>
        ) : (
          <FlatList
            data={pacientes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PacienteCard
                paciente={item}
                onPress={() =>
                  router.push({
                    pathname: "/historico-paciente",
                    params: {
                      pacienteId: item.id.toString(),
                      nomePaciente: item.name,
                    },
                  })
                }
              />
            )}
          />
        )}

        <Pressable
          style={({ pressed }) => [
            styles.pillButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => router.push("/cadastro-paciente")}
        >
          <Text style={styles.pillButtonText}>Adicionar paciente</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 40,
  },
  meusPacientes: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 16,
  },
  pillButton: {
    width: "75%",
    height: 50,
    backgroundColor: "#0066cc",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
    alignSelf: "center",
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;
