import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/context/AuthContext";

const CadastroPaciente = () => {
  const router = useRouter();
  const { cadastrarPaciente } = useAuth();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [salvando, setSalvando] = useState(false);

  const handleCadastrar = async () => {
    if (!nome.trim() || !idade.trim()) {
      Alert.alert("Atenção", "Preencha nome e idade do paciente.");
      return;
    }

    const idadeNumero = Number(idade);
    if (isNaN(idadeNumero) || idadeNumero <= 0) {
      Alert.alert("Atenção", "Digite uma idade válida.");
      return;
    }

    setSalvando(true);
    try {
      await cadastrarPaciente(nome.trim(), idadeNumero);
      router.push("/screenA");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar o paciente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Novo Paciente</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Nome do paciente"
          autoCapitalize="words"
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          value={idade}
          onChangeText={setIdade}
          placeholder="Idade"
          keyboardType="numeric"
        />

        <Pressable
          style={({ pressed }) => [styles.pillButton, pressed && { opacity: 0.8 }]}
          onPress={handleCadastrar}
          disabled={salvando}
        >
          <Text style={styles.pillButtonText}>
            {salvando ? "Salvando..." : "Cadastrar"}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.linkButton, pressed && { opacity: 0.6 }]}
          onPress={() => router.back()}
          disabled={salvando}
        >
          <Text style={styles.linkButtonText}>Cancelar</Text>
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
    paddingHorizontal: 24,
    paddingTop: 150,
  },
  title: {
    width: "100%",
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 24,
  },
  pillButton: {
    width: "75%",
    height: 50,
    backgroundColor: "#0066cc",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  pillButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  linkButtonText: {
    color: "#0066cc",
    fontSize: 14,
  },
});

export default CadastroPaciente;