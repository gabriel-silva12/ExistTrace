import { Table, Column } from "@/components/table";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GridItem } from "../components/GridSelector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import { useAuth } from "@/hooks/context/AuthContext";
import { usePacientes } from "@/hooks/usePacientes";

const screens: Href[] = [
  "/login",
  "/telaPrincipal",
  "/cadastroPaciente",
  "/historicoSessao",
  "/screenB",
  "/screenC",
  "/screenD",
];

const historicoSessao = () => {
  const router = useRouter();
  const { perfil } = useAuth();
  const { pacientes, carregando } = usePacientes();
  const nomePsicologo = perfil?.nome.split(" ")[0] || "Psicólogo";
  const [tableMaxHeight, setTableMaxHeight] = useState<number>();

  return (
    <View>
      <Text>Placeholder</Text>
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
    paddingHorizontal: 6,
    paddingTop: 150,
    alignItems: "stretch",
  },
  tableContainer: {
    flex: 1,
    minHeight: 0,
  },
  title: {
    width: "100%",
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 40,
    marginTop: 0,
  },
  meusPacientes: {
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 5,
  },
  pillButton: {
    width: "75%",
    height: 50,
    backgroundColor: "#0066cc",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 15,
    alignSelf: "center",
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default historicoSessao;
