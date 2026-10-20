import { StyleSheet, Text, View } from "react-native";
import InfoCard from "@/components/InfoCard";
import Desenho from "@/components/Desenho";
import { Propriedades } from "./types";
import { formatarParaDataBR } from "@/utils/date";

const SessaoCard = ({ sessao }: Propriedades) => {
  return (
    <InfoCard
      titulo={formatarParaDataBR(sessao.data)}
      campos={[
        { label: "Emojis", value: sessao.emoji },
        { label: "Palavra", value: sessao.palavra_selecionada },
        { label: "Escrita livre", value: sessao.palavra_livre },
      ]}
    >
      {sessao.desenho && sessao.desenho.traces.length > 0 && (
        <>
          <Text style={styles.rotulo}>Desenho:</Text>
          <View style={styles.miniatura}>
            <Desenho desenho={sessao.desenho} tamanho={100} />
          </View>
        </>
      )}
    </InfoCard>
  );
};

const styles = StyleSheet.create({
  rotulo: {
    fontSize: 16,
    color: "#333333",
    marginTop: 8,
  },
  miniatura: {
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d7e2e5",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default SessaoCard;