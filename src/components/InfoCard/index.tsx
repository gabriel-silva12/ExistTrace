import { Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Propriedades } from "./types";
import { styles } from "./styles";

const InfoCard = ({ titulo, campos, onPress, avatar }: Propriedades) => {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper style={styles.card} onPress={onPress}>
      {avatar &&
        (avatar.fotoUrl ? (
          <Image source={{ uri: avatar.fotoUrl }} style={styles.avatarFoto} />
        ) : (
          <View style={styles.avatarCirculo}>
            <MaterialCommunityIcons name="account" size={26} color="#888888" />
          </View>
        ))}

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>{titulo}</Text>
        {campos.map((campo, index) => (
          <Text key={index} style={styles.linha}>
            {campo.label}: {campo.value}
          </Text>
        ))}
      </View>
    </Wrapper>
  );
};

export default InfoCard;
