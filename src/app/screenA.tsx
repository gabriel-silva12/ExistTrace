
import { Table, Column } from "@/components/table";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GridItem } from "../components/GridSelector";
//hook

import { useAuth } from "@/hooks/context/AuthContext";
const screens: Href[] = ["/login", "/screenA", "/screenB", "/screenC", "/screenD"];

// 1. Dashboard specific choices
const emojis: GridItem[] = [
  { id: "1", title: "🥳"},
  { id: "2", title: "😎"},
  { id: "3", title: "👽"},
  { id: "4", title: "💗" },
];

type Paciente = {
  id: number;
  name: string;
  ficha: string;
}

const pacientes : Paciente[] = [
  {
    id: 1,
    name: 'Gabriel',
    ficha: 'Visualizar ficha',
  },
  {
    id: 2,
    name: 'Luana',
    ficha: 'Visualizar ficha',
  },
];

const colunas:Column<Paciente>[] = [
  {
    key: 'name',
    title: 'Name',
    width: 150,
  },
  {
    key: 'ficha',
    title: 'Ficha',
    width: 250,
  },
];

const ScreenA = () => {
  const router = useRouter();
  const { perfil } = useAuth() // captura perfil do hook
  const nomePsicologo = perfil?.nome.split( " " )[0] || "Psicólogo"
  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bem-vindo, {nomePsicologo}</Text>
        <Text style={styles.meusPacientes}>Meus Pacientes</Text>


        <Table
          columns={colunas}
          data={pacientes}
        />

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
  container: { 
    flex: 1, 
    backgroundColor: "#ffffff" 
  },
  contentContainer: { 
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 60,
    alignItems: "stretch"
   },
   title: {
    width: "100%",
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 20,
    marginTop: 20,
  },
  meusPacientes: {
    width: "100%",
    fontSize: 24,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 5,
  },


  pillButton: {
    width: "100%",
    height: 54,
    backgroundColor: "#0066cc",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});

export default ScreenA;