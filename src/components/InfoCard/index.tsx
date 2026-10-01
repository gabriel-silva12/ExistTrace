import { Pressable, Text, View } from "react-native";
import { Propriedades } from "./types";
import { styles } from "./styles";

const InfoCard = ({ titulo, campos, onPress }: Propriedades) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper style={styles.card} onPress={onPress}>
      <Text style={styles.titulo}>{titulo}</Text>
      {campos.map((campo, index) => (
        <Text key={index} style={styles.linha}>
          {campo.label}: {campo.value}
        </Text>
      ))}
    </Wrapper>
  );
};

export default InfoCard;
