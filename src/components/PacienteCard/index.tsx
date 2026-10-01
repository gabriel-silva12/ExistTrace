import InfoCard from "@/components/InfoCard";
import { Propriedades } from "./types";

const PacienteCard = ({ paciente, onPress }: Propriedades) => {
  return (
    <InfoCard
      titulo={paciente.name}
      campos={[{ label: "Ficha", value: "Visualizar" }]}
      onPress={onPress}
    />
  );
};

export default PacienteCard;
