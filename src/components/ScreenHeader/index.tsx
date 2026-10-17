import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import { Propriedades } from "./types";

const ScreenHeader = ({ titulo, saudacao, subtitulo, compacto }: Propriedades) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + 20 },
        compacto && styles.headerCompacto,
      ]}
    >
      {/* texto da barra de status em branco, por causa do fundo escuro */}
      <StatusBar style="light" />

      {/* camada só dos círculos decorativos, recortada nos cantos arredondados */}
      <View style={styles.fundo} pointerEvents="none">
        <View style={styles.circuloGrande} />
        <View style={styles.circuloPequeno} />
      </View>

      {!!saudacao && <Text style={styles.saudacao}>{saudacao}</Text>}
      <Text style={styles.titulo}>{titulo}</Text>
      {!!subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}

      <View style={[styles.avatarCircle, { top: insets.top + 26 }]}>
        <MaterialCommunityIcons name="account" size={30} color="#ffffff" />
      </View>
    </View>
  );
};

export default ScreenHeader;