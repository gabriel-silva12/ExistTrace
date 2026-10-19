import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Propriedades } from "./types";
import { styles } from "./styles";

const PerfilHeader = ({
  nome,
  saudacao,
  idade,
  estiloContainer,
  estiloNome,
}: Propriedades) => {
  return (
    <View style={[styles.header, estiloContainer]}>
      <View style={styles.textos}>
        {saudacao && <Text style={styles.saudacao}>{saudacao}</Text>}
        <Text style={[styles.nome, estiloNome]}>{nome}</Text>
        {idade !== undefined && <Text style={styles.idade}>{idade} anos</Text>}
      </View>

      <View style={styles.avatarCirculo}>
        <MaterialCommunityIcons name="account" size={30} color="#1c1942" />
      </View>
    </View>
  );
};

export default PerfilHeader;
