import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRoute, useRouter } from "expo-router";

import SessaoCard from "@/components/SessaoCard";
import PerfilHeader from "@/components/PerfilHeader";
import { useSessoes } from "@/hooks/useSessoes";

const HistoricoPaciente = () => {
  
  const { pacienteId, nomePaciente, idadePaciente } = useLocalSearchParams<{
    pacienteId?: string,
    nomePaciente?: string,
    idadePaciente?: string,
  }>()

  const router = useRouter()


  const pacienteIdNum = pacienteId ? Number(pacienteId) : null

  const { sessoes, carregando, erro, recarregar } = useSessoes(pacienteIdNum)

  return (
     <View style={styles.container}>
        <PerfilHeader
          nome={nomePaciente || "Paciente"}
          idade={idadePaciente ? Number(idadePaciente) : undefined}
          estiloNome={{ fontSize: 32 }}
        />
        <View style={styles.contentContainer}>
    
        
        {carregando ? (
          <ActivityIndicator style={styles.estado} color="#407FA0" />
        ) : erro ? (
          <View style={styles.estado}>
            <Text style={styles.estadoTexto}>{erro}</Text>
            <Pressable onPress={recarregar} hitSlop={8}>
              <Text style={styles.tentarNovamente}>Tentar novamente</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={sessoes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SessaoCard sessao={item} />}
            ListEmptyComponent={
              <Text style={[styles.estado, styles.estadoTexto]}>
                Nenhuma sessão registrada ainda.
              </Text>
            }
          />
        )}

        <Pressable
          style={({ pressed }) => [
            styles.pillButton,
            !pacienteIdNum && styles.pillButtonDisabled,
            pressed && { opacity: 0.8 },
          ]}
          disabled={!pacienteIdNum}
          onPress={() =>
            router.push({
              pathname: "/quiz-emoji",
              params: { pacienteId },
            })
          }
        >
          <Text style={styles.pillButtonText}>Aplicar quiz</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf3f6",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 35,
  },
  estado: {
    marginTop: 32,
    alignItems: "center",
  },
  estadoTexto: {
    alignItems: "center",
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
  },
  tentarNovamente: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "bold",
    color: "#407FA0",
  },
  pillButton: {
    width: "75%",
    height: 56,
    backgroundColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    alignSelf: "center",
  },
  pillButtonDisabled: { backgroundColor: "#cccccc" },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HistoricoPaciente;