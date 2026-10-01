import { Table, Column } from "@/components/table";
import { Href, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard, //teclado
  KeyboardAvoidingView, //pro teclado nao cobri os inputs do login
  Platform,
  Pressable, //android ou ios
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback, //fecha o teclado se clicar fora
  View,
} from "react-native";
import { GridItem } from "../components/GridSelector";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

import { useAuth } from "@/hooks/context/AuthContext";
import { usePacientes } from "@/hooks/usePacientes";

import SessaoCard from "@/components/SessaoCard";

type Sessao = {
  id: number;
  data: string;
  emoji: string;
  palavra_fixa: string;
  palavra_livre: string;
}

const sessoesMock: Sessao[] = [
  { id: 1, data: "21/09/2026", emoji: "🥳", palavra_fixa: "Animado", palavra_livre: "Foi um bom dia" },
  { id: 2, data: "13/09/2026", emoji: "😎", palavra_fixa: "Confiante", palavra_livre: "Consegui resolver o problema" },
  { id: 3, data: "28/08/2026", emoji: "👽", palavra_fixa: "Estranho", palavra_livre: "Não sei explicar o que senti" },
  { id: 4, data: "21/08/2026", emoji: "💗", palavra_fixa: "Grato", palavra_livre: "" },
];

const HistoricoSessao = () => {
  const router = useRouter();
  const { perfil } = useAuth();
  const { pacientes, carregando } = usePacientes();
  const nomePsicologo = perfil?.nome.split(" ")[0] || "Psicólogo";
  const [tableMaxHeight, setTableMaxHeight] = useState<number>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}></Text>
      <Text style={styles.subtitulo}></Text>

      <FlatList
        data={sessoesMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <SessaoCard sessao={item} />}
      />

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 16,
  },
  voltarButton: {
    marginTop: 16,
    alignSelf: "center",
  },
  voltarTexto: {
    color: "#0066cc",
    fontSize: 14,
  },
});

export default HistoricoSessao;
