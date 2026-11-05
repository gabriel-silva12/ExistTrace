import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "@/components/ScreenHeader";
import { cores } from "@/components/quiz-ui";
import { supabase } from "@/services/supabase";
import { useAuth } from "@/hooks/context/AuthContext";

type FormPerfil = { nome: string; email: string };
type Erros = Partial<Record<keyof FormPerfil, string>>;

type Campo = {
  chave: keyof FormPerfil;
  rotulo: string;
  teclado?: "email-address";
  somenteLeitura?: boolean;
};

const CAMPOS: Campo[] = [
  { chave: "nome", rotulo: "Nome" },
  { chave: "email", rotulo: "E-mail", teclado: "email-address", somenteLeitura: true },
];

function formDoPerfil(perfil: { nome?: string; email?: string } | null): FormPerfil {
  return {
    nome: perfil?.nome ?? "",
    email: perfil?.email ?? "",
  };
}

function validar(form: FormPerfil): Erros {
  const erros: Erros = {};
  if (form.nome.trim().length < 3) erros.nome = "Informe o nome completo.";
  return erros;
}

export default function Configuracoes() {
  const router = useRouter();
  const { perfil, logout, recarregarPerfil } = useAuth();

  // Perfil
  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [form, setForm] = useState<FormPerfil>(formDoPerfil(perfil));
  const [erros, setErros] = useState<Erros>({});

  // Senha (OTP)
  const [senhaAberta, setSenhaAberta] = useState(false);
  const [etapaSenha, setEtapaSenha] = useState<"enviar" | "codigo">("enviar");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmVisivel, setConfirmVisivel] = useState(false);
  const [loadingSenha, setLoadingSenha] = useState(false);

  useEffect(() => {
    if (!editando) setForm(formDoPerfil(perfil));
  }, [perfil, editando]);

  const alterar = (campo: keyof FormPerfil, valor: string) => {
    setForm((atual) => ({ ...atual, [campo]: valor }));
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const cancelar = () => {
    setForm(formDoPerfil(perfil));
    setErros({});
    setEditando(false);
  };

  const salvar = async () => {
    const novosErros = validar(form);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    if (!perfil?.id) {
      Alert.alert("Erro", "Não foi possível identificar o psicólogo logado.");
      return;
    }

    setSalvando(true);
    const { error } = await supabase
      .from("psicologo")
      .update({ nome: form.nome.trim() })
      .eq("id", perfil.id);
    setSalvando(false);

    if (error) {
      Alert.alert("Erro ao atualizar", error.message);
      return;
    }

    await recarregarPerfil();
    setEditando(false);
    Alert.alert("Pronto", "Perfil atualizado com sucesso.");
  };

  const confirmarExclusao = () => {
    Alert.alert(
      "Excluir conta",
      "Essa ação é permanente e remove seus dados. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            if (!perfil?.id) return;

            setExcluindo(true);
            const { error } = await supabase
              .from("psicologo")
              .delete()
              .eq("id", perfil.id);
            setExcluindo(false);

            if (error) {
              Alert.alert("Erro ao excluir", error.message);
              return;
            }

            await logout();
            router.replace("/login");
          },
        },
      ]
    );
  };

  const fecharSenha = () => {
    setSenhaAberta(false);
    setEtapaSenha("enviar");
    setCodigo("");
    setNovaSenha("");
    setConfirmar("");
    setSenhaVisivel(false);
    setConfirmVisivel(false);
  };

  const enviarCodigo = async () => {
    if (!perfil?.email) {
      Alert.alert("Erro", "Não foi possível identificar o e-mail da conta.");
      return;
    }
    setLoadingSenha(true);
    const { error } = await supabase.auth.resetPasswordForEmail(perfil.email);
    setLoadingSenha(false);

    if (error) {
      Alert.alert("Erro", error.message);
      return;
    }
    Alert.alert("Verifique seu e-mail", "Enviamos um código para o e-mail da sua conta.");
    setEtapaSenha("codigo");
  };

  const redefinirSenha = async () => {
    if (!codigo.trim() || !novaSenha || !confirmar) {
      Alert.alert("Aviso", "Preencha o código e a nova senha.");
      return;
    }
    if (novaSenha.length < 6) {
      Alert.alert("Aviso", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmar) {
      Alert.alert("Aviso", "As senhas não coincidem.");
      return;
    }
    if (!perfil?.email) return;

    setLoadingSenha(true);
    try {
      const { error: erroOtp } = await supabase.auth.verifyOtp({
        email: perfil.email,
        token: codigo.trim(),
        type: "recovery",
      });
      if (erroOtp) throw erroOtp;

      const { error: erroSenha } = await supabase.auth.updateUser({ password: novaSenha });
      if (erroSenha) throw erroSenha;

      await logout();
      Alert.alert("Pronto", "Senha alterada. Entre novamente com a nova senha.");
      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Erro", e.message ?? "Não foi possível alterar a senha.");
    } finally {
      setLoadingSenha(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        titulo="Configurações"
        subtitulo="Configurações do aplicativo"
        mostrarAvatar={false}
        onVoltar={() => router.back()}
        compacto
      />
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.secao}>Perfil</Text>
        <View style={styles.card}>
          {CAMPOS.map(({ chave, rotulo, teclado, somenteLeitura }) => (
            <View key={chave} style={styles.campo}>
              <Text style={styles.rotulo}>{rotulo}</Text>
              {editando && !somenteLeitura ? (
                <>
                  <TextInput
                    value={form[chave]}
                    onChangeText={(texto) => alterar(chave, texto)}
                    keyboardType={teclado}
                    autoCapitalize={chave === "nome" ? "words" : "none"}
                    editable={!salvando}
                    style={[styles.input, erros[chave] && styles.inputErro]}
                  />
                  {erros[chave] ? <Text style={styles.erro}>{erros[chave]}</Text> : null}
                </>
              ) : (
                <Text style={styles.valor}>{form[chave] || "-"}</Text>
              )}
            </View>
          ))}

          {editando ? (
            <View style={styles.linhaBotoes}>
              <Pressable
                onPress={cancelar}
                disabled={salvando}
                style={({ pressed }) => [styles.botaoSecundario, pressed && styles.pressionado]}
              >
                <Text style={styles.textoSecundario}>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={salvar}
                disabled={salvando}
                style={({ pressed }) => [styles.botaoPrimario, pressed && styles.pressionado]}
              >
                {salvando ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.textoPrimario}>Salvar</Text>
                )}
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={() => setEditando(true)}
              style={({ pressed }) => [styles.botaoEditar, pressed && styles.pressionado]}
            >
              <Feather name="edit-2" size={16} color={cores.botao} />
              <Text style={styles.textoEditar}>Editar perfil</Text>
            </Pressable>
          )}
        </View>

        <Text style={[styles.secao, styles.secaoEspaco]}>Segurança</Text>
        <View style={styles.card}>
          {!senhaAberta ? (
            <Pressable
              onPress={() => setSenhaAberta(true)}
              style={({ pressed }) => [styles.botaoEditar, pressed && styles.pressionado]}
            >
              <Feather name="lock" size={16} color={cores.botao} />
              <Text style={styles.textoEditar}>Alterar senha</Text>
            </Pressable>
          ) : (
            <>
              <Text style={styles.ajuda}>
                {etapaSenha === "enviar"
                  ? "Enviaremos um código para o e-mail da sua conta."
                  : "Digite o código recebido e escolha a nova senha."}
              </Text>

              {etapaSenha === "codigo" && (
                <>
                  <View style={styles.campo}>
                    <Text style={styles.rotulo}>Código</Text>
                    <TextInput
                      value={codigo}
                      onChangeText={setCodigo}
                      keyboardType="number-pad"
                      editable={!loadingSenha}
                      style={styles.input}
                    />
                  </View>

                  <View style={styles.campo}>
                    <Text style={styles.rotulo}>Nova senha</Text>
                    <View style={styles.linhaSenha}>
                      <TextInput
                        value={novaSenha}
                        onChangeText={setNovaSenha}
                        secureTextEntry={!senhaVisivel}
                        autoCapitalize="none"
                        editable={!loadingSenha}
                        style={styles.inputSenha}
                      />
                      <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)} hitSlop={8}>
                        <Feather name={senhaVisivel ? "eye" : "eye-off"} size={18} color="#6B7780" />
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.campo}>
                    <Text style={styles.rotulo}>Confirmar nova senha</Text>
                    <View style={styles.linhaSenha}>
                      <TextInput
                        value={confirmar}
                        onChangeText={setConfirmar}
                        secureTextEntry={!confirmVisivel}
                        autoCapitalize="none"
                        editable={!loadingSenha}
                        style={styles.inputSenha}
                      />
                      <Pressable onPress={() => setConfirmVisivel(!confirmVisivel)} hitSlop={8}>
                        <Feather name={confirmVisivel ? "eye" : "eye-off"} size={18} color="#6B7780" />
                      </Pressable>
                    </View>
                  </View>
                </>
              )}

              <View style={styles.linhaBotoes}>
                <Pressable
                  onPress={fecharSenha}
                  disabled={loadingSenha}
                  style={({ pressed }) => [styles.botaoSecundario, pressed && styles.pressionado]}
                >
                  <Text style={styles.textoSecundario}>Cancelar</Text>
                </Pressable>
                <Pressable
                  onPress={etapaSenha === "enviar" ? enviarCodigo : redefinirSenha}
                  disabled={loadingSenha}
                  style={({ pressed }) => [styles.botaoPrimario, pressed && styles.pressionado]}
                >
                  {loadingSenha ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.textoPrimario}>
                      {etapaSenha === "enviar" ? "Enviar código" : "Redefinir"}
                    </Text>
                  )}
                </Pressable>
              </View>

              {etapaSenha === "codigo" && (
                <Pressable onPress={enviarCodigo} disabled={loadingSenha}>
                  <Text style={styles.reenviar}>Reenviar código</Text>
                </Pressable>
              )}
            </>
          )}
        </View>

        <Text style={[styles.secao, styles.secaoEspaco]}>Zona de risco</Text>
        <Pressable
          onPress={confirmarExclusao}
          disabled={excluindo}
          style={({ pressed }) => [styles.botaoExcluir, pressed && styles.pressionado]}
        >
          {excluindo ? (
            <ActivityIndicator color="#C0392B" />
          ) : (
            <>
              <Feather name="trash-2" size={16} color="#C0392B" />
              <Text style={styles.textoExcluir}>Excluir conta</Text>
            </>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingHorizontal: 12, paddingTop: 16, paddingBottom: 24 },
  pressionado: { opacity: 0.6 },
  secao: { fontSize: 17, fontWeight: "700", color: "#111", marginBottom: 8 },
  secaoEspaco: { marginTop: 24 },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 20,
    padding: 16,
  },

  campo: { marginBottom: 14 },
  rotulo: { fontSize: 13, fontWeight: "600", color: "#6B7780", marginBottom: 4 },
  valor: { fontSize: 16, color: "#111" },
  input: {
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111",
    backgroundColor: "#fff",
  },
  inputErro: { borderColor: "#C0392B" },
  erro: { fontSize: 12, color: "#C0392B", marginTop: 4 },

  ajuda: { fontSize: 14, color: "#6B7780", marginBottom: 14 },
  linhaSenha: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDE3E8",
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  inputSenha: { flex: 1, paddingVertical: 10, fontSize: 16, color: "#111" },
  reenviar: { textAlign: "center", color: cores.botao, fontSize: 13, marginTop: 14 },

  botaoEditar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: cores.botao,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  textoEditar: { fontSize: 14, fontWeight: "600", color: cores.botao },

  linhaBotoes: { flexDirection: "row", gap: 10 },
  botaoSecundario: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: cores.botao,
    borderRadius: 999,
    paddingVertical: 10,
  },
  textoSecundario: { fontSize: 14, fontWeight: "600", color: cores.botao },
  botaoPrimario: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.botao,
    borderRadius: 999,
    paddingVertical: 10,
  },
  textoPrimario: { fontSize: 14, fontWeight: "700", color: "#fff" },

  botaoExcluir: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#C0392B",
    borderRadius: 16,
    paddingVertical: 14,
  },
  textoExcluir: { fontSize: 16, fontWeight: "700", color: "#C0392B" },
});