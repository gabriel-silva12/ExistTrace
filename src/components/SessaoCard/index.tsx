import InfoCard from "@/components/InfoCard";
import { Propriedades } from "./types";
import { formatarParaDataBR } from "@/utils/date";

const SessaoCard = ({ sessao }: Propriedades) => {
  return (
    <InfoCard
      titulo={formatarParaDataBR(sessao.data)}
      campos={[
        { label: "Emoji", value: sessao.emoji },
        { label: "Palavra", value: sessao.palavra_fixa },
        { label: "Escrita livre", value: sessao.palavra_livre },
      ]}
    />
  );
};

export default SessaoCard;
