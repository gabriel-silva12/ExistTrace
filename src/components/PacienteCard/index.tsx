import InfoCard from "@/components/InfoCard";
import { Propriedades } from "./types";

const PacienteCard = ({ paciente, onPress }: Propriedades) => {
  return (
    <InfoCard
      titulo={paciente.name}
      campos={[{ label: "Ultima sessão", value: "01/10/2026" }]}
      avatar={{ fotoUrl: paciente.fotoUrl }}
      onPress={onPress}
    />
  );
};

export default PacienteCard;
