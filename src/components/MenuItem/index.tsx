import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { cores } from "@/components/quiz-ui";
import { MenuItemProps } from "./types";
import { styles } from "./styles";

export default function MenuItem({ icone, titulo, subtitulo, onPress, semBorda }: MenuItemProps) {

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.item, pressed && styles.pressionado]}>
<Feather name={icone} size={22} color={cores.botao} />
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={styles.subtitulo}>{subtitulo}</Text> : null}
      </View>
<Feather name="chevron-right" size={22} color={cores.borda} />
    </Pressable>
  );
}