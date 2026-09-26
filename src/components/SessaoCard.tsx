import { StyleSheet, Text, View } from "react-native";

type Sessao = {
    id : number
    data: string
    emoji: string
    palavra_fixa: string
    palavra_livre: string
}

type Propiedades = {
    sessao: Sessao
}

const SessaoCard = ({ sessao }: Propiedades ) => {
    
    const dataFormatada = new Date(sessao.data).toLocaleDateString("pt-BR")

    return (
        <View style={styles.card}>
            <Text style={styles.data}>{dataFormatada}</Text>
            <Text style={styles.linha}>Emoji:{sessao.emoji}</Text>
            <Text style={styles.linha}>Palavra: {sessao.palavra_fixa}</Text>
            <Text style={styles.linha}>Escrita livre: {sessao.palavra_livre}</Text>
        </View>
    )

 
}

const styles = StyleSheet.create({
    card: {
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    },
    data: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    },
    linha: {
    fontSize: 13,
    color: "#333333",
    },
});

export default SessaoCard