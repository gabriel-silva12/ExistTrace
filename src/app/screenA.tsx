
import { Table, Column } from "@/components/table";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GridItem } from "../components/GridSelector";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
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
    ficha: 'Visualizar ',
  },
  {
    id: 2,
    name: 'Luana',
    ficha: 'Visualizar',
  },
   {
    id: 2,
    name: 'Gabriel',
    ficha: 'Visualizar',
  },
   {
    id: 3,
    name: 'Gabriel',
    ficha: 'Visualizar',
  },
   {
    id: 4,
    name: 'Luana',
    ficha: 'Visualizar',
  },
   {
    id: 5,
    name: 'Gabriel',
    ficha: 'Visualizar',
  },
  {
    id: 6,
    name: 'Luana',
    ficha: 'Visualizar',
  },
  {
    id: 7,
    name: 'Gabriel',
    ficha: 'Visualizar',
  },
  {
    id: 8,
    name: 'Luana',
    ficha: 'Visualizar',
  },
  {
    id: 9,
    name: 'Gabriel S.',
    ficha: 'Visualizar',
  },
  {
    id: 10,
    name: 'Luana C.',
    ficha: 'Visualizar',
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
    width: 38,
    align: "center",
    render: (item) => (
      <Pressable onPress={() => console.log(`Abrindo ficha para paciente de ID: ${item.id}`)}>
        <MaterialCommunityIcons name="file-document" size={28} color="#0066cc" />
      </Pressable>

    )

  },
];

const ScreenA = () => {
  const router = useRouter();
  const { perfil } = useAuth() // captura perfil do hook
  const nomePsicologo = perfil?.nome.split( " " )[0] || "Psicólogo"
  const [tableMaxHeight, setTableMaxHeight] = useState<number>()

  

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Bem-vindo, {nomePsicologo}</Text>
        <Text style={styles.meusPacientes}>Meus Pacientes</Text>

      <View style={styles.tableContainer}
            onLayout= { (event) => {
              setTableMaxHeight(event.nativeEvent.layout.height)  
            }
          }
        >
          <Table
            columns={colunas}
            data={pacientes}
          />
      </View>

        <Pressable 
          style={({ pressed }) => [styles.pillButton, pressed && { opacity: 0.8 }]} 
          onPress={() => router.push("/screenB")}
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
    backgroundColor: "#ffffff" 
  },
  contentContainer: { 
    flex: 1,
    paddingHorizontal: 6,
    paddingTop: 150,
    alignItems: "stretch"
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

export default ScreenA;