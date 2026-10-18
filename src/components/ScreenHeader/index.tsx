import { Pressable, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./styles";
import { Propriedades } from "./types";

const ScreenHeader = ({
  titulo,
  saudacao,
  subtitulo,
  descricao,
  compacto,
  mostrarAvatar = true,
  iniciais,
  onPressAvatar,
  onVoltar,
  mostrarDecoracao = true,
}: Propriedades) => {
  const insets = useSafeAreaInsets();

  const avatar = (
    <View style={styles.avatarCircle}>
      {iniciais ? (
        <Text style={styles.iniciais}>{iniciais.slice(0, 2).toUpperCase()}</Text>
      ) : (
        <MaterialCommunityIcons name="account" size={30} color="#ffffff" />
      )}
    </View>
  );

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

      {mostrarDecoracao && (
        <View style={styles.fundo} pointerEvents="none">
          <View style={styles.circuloGrande} />
          <View style={styles.anel} />
        </View>
      )}

      {!!onVoltar && (
        <Pressable
          onPress={onVoltar}
          hitSlop={8}
          style={styles.botaoVoltar}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color="#ffffff" />
        </Pressable>
      )}

      <View style={styles.linha}>
        <View style={styles.textos}>
          {!!saudacao && <Text style={styles.saudacao}>{saudacao}</Text>}

          <Text style={styles.titulo} numberOfLines={2}>
            {titulo}
          </Text>

          {!!subtitulo && (
            <View style={styles.chip}>
              <Text style={styles.chipTexto}>{subtitulo}</Text>
            </View>
          )}

          {!!descricao && (
            <Text style={styles.descricao} numberOfLines={3}>
              {descricao}
            </Text>
          )}
        </View>

        {mostrarAvatar &&
          (onPressAvatar ? (
            <Pressable
              onPress={onPressAvatar}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Abrir perfil"
            >
              {avatar}
            </Pressable>
          ) : (
            avatar
          ))}
      </View>
    </View>
  );
};

export default ScreenHeader;