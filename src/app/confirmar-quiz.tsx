import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/services/supabase";

const ConfirmarQuiz = () => {
    const router = useRouter()
    
    const { pacienteId, emoji, palavraFixa, palavraLivre } = useLocalSearchParams<{
        pacienteId: string,
        emoji: string,
        palavraFixa: string,
        palavraLivre: string
    }>() 

    const [salvando, setSalvando] = useState(false)

    const confirmar = async () => {
        if (salvando) return
        setSalvando(true)

        const { error } = await supabase.from("sessao_terapia").insert({
            paciente_id: Number(pacienteId),
            emoji,
            palavra_selecionada: palavraFixa,
            palavra_livre: palavraLivre
        })

        setSalvando(false)

        if (error) {
            console.error(error.message)
            Alert.alert("Não conseguimos salvar a sessão, tente novamente em alguns instantes")
            return
        }

        router.dismiss(4)
    }

    const recomecar = () => {
        router.dismiss(4)
        router.push( {pathname: "/quiz-emoji", params: {pacienteId}})
    }

    return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Confirme as respostas</Text>
        <Text style={styles.subtitle}>Está tudo certo?</Text>

        <View style={styles.card}>
          <View style={styles.linha}>
            <Text style={styles.rotulo}>Emoji</Text>
            <Text style={styles.emoji}>{emoji}</Text>
          </View>

          <View style={styles.separador} />

          <View style={styles.linha}>
            <Text style={styles.rotulo}>Palavra selecionada</Text>
            <Text style={styles.valor}>{palavraFixa}</Text>
          </View>

          <View style={styles.separador} />

          <View style={styles.linha}>
            <Text style={styles.rotulo}>Escrita livre</Text>
            <Text style={styles.valor}>{palavraLivre}</Text>
          </View>
        </View>
            <View style={styles.botoes}>
        
                <Pressable
                    style={({ pressed }) => [
                        styles.pillButton,
                        salvando && styles.pillButtonDisabled,
                        pressed && { opacity: 0.8 },
                    ]}
                    onPress={confirmar}
                    disabled={salvando}
                >
                    <Text style={styles.pillButtonText}>
                        {salvando ? "Salvando..." : "Confirmar"}
                    </Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.pillButtonOutline,
                        pressed && { opacity: 0.6 },
                    ]}
                    onPress={recomecar}
                    disabled={salvando}
                >
                    <Text style={styles.pillButtonOutlineText}>Recomeçar</Text>
                </Pressable>
            </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf3f6" },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111111",
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 32,

    overflow: "hidden",
  
    //ios
    shadowColor: "#185366",       // Using your palette's deep blue makes the shadow look natural, not dirty
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,          // Keep it very soft and subtle
    shadowRadius: 12,

    //android
    elevation: 3,   
  },
  linha: {
    paddingVertical: 14,
  },
  rotulo: {
    fontSize: 14,
    color: "#6b7684",
    marginBottom: 8,
  },
  emoji: { fontSize: 40 },
  valor: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111111",
  },
  separador: {
    height: 1.2,
    backgroundColor: "#d7e2e5",
  },
  botoes: {
        width: "100%",
        flexDirection: "row",
        gap: 4,
  },
  pillButton: {
    flex: 1,
    height: 54,
    backgroundColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  pillButtonDisabled: { backgroundColor: "#cccccc" },
  pillButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  pillButtonOutline: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: "#407FA0",
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  
  },
  pillButtonOutlineText: {
    color: "#407FA0",
    fontSize: 16,
    fontWeight: "bold",
  },

});

export default ConfirmarQuiz