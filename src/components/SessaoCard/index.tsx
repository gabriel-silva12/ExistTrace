import { Text, View } from "react-native";
import { Propriedades } from "./types";
import { styles } from "./styles";
import { formatarParaDataBR } from "@/utils/date";

const SessaoCard = ({ sessao }: Propriedades) => {
  return (
    <View style={styles.card}>
      <Text style={styles.data}>{formatarParaDataBR(sessao.data)}</Text>
      <Text style={styles.linha}>Emoji: {sessao.emoji}</Text>
      <Text style={styles.linha}>Palavra: {sessao.palavra_fixa}</Text>
      <Text style={styles.linha}>Escrita livre: {sessao.palavra_livre}</Text>
    </View>
  );
};

export default SessaoCard;
