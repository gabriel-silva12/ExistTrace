//vou mudar ainda, não tem essa tela no figma
//tela provisoria
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { supabase } from "@/services/supabase";
import { useAuth } from "@/hooks/context/AuthContext";
import { cores, LogoCircle, PrimaryButton } from "@/components/quiz-ui";

export default function CadastroPacienteScreen() {
  const router = useRouter();
  const { perfil } = useAuth();

  const [codinome, setCodinome] = useState("");
  const [idade, setIdade] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    const idadeNum = parseInt(idade, 10);

    if (!codinome.trim() || !idade) {
      Alert.alert("Aviso", "Por favor, preencha todos os campos.");
      return;
    }
    if (isNaN(idadeNum) || idadeNum <= 0 || idadeNum > 120) {
      Alert.alert("Erro", "Informe uma idade válida.");
      return;
    }
    if (!perfil?.id) {
      Alert.alert("Erro", "Não foi possível identificar o psicólogo logado.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("paciente").insert({
      codinome: codinome.trim(),
      idade: idadeNum,
      psicologo_id: perfil.id,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Erro no cadastro", error.message);
      return;
    }

    Alert.alert("Sucesso!", "Paciente cadastrado com sucesso.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View style={styles.innerContainer}>
        

        <View style={{ width: "100%" }}>
          <Text style={styles.title}>Novo paciente</Text>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="account-outline" size={20} color={cores.borda} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Codinome"
              placeholderTextColor={cores.borda}
              value={codinome}
              onChangeText={setCodinome}
              autoCapitalize="words"
              editable={!loading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="cake-variant-outline" size={20} color={cores.borda} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Idade"
              placeholderTextColor={cores.borda}
              value={idade}
              onChangeText={(t) => setIdade(t.replace(/\D/g, ""))}
              keyboardType="number-pad"
              maxLength={3}
              editable={!loading}
            />
          </View>

          <PrimaryButton
            titulo={loading ? "Salvando..." : "Cadastrar"}
            onPress={handleSalvar}
            desabilitado={loading}
            style={styles.botao}
          />

          <Pressable
            style={({ pressed }) => [pressed && { opacity: 0.6 }]}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.voltarTexto}>
              <Text style={styles.voltarLink}>Cancelar</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  logoContainer: { alignItems: "center", marginBottom: 28 },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: cores.header,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: cores.borda,
    paddingBottom: 10,
    marginBottom: 18,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2A33",
    paddingVertical: 4,
  },
  botao: { marginTop: 8, marginBottom: 20 },
  voltarTexto: { textAlign: "center", color: cores.borda, fontSize: 13 },
  voltarLink: { color: cores.botao, fontWeight: "bold" },
});