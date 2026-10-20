import { Image, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { cores } from "@/components/quiz-ui";
import { AvatarPerfilProps } from "./types";
import { styles } from "./styles";

export default function AvatarPerfil({ iniciais, fotoUrl, tamanho = 160 }: AvatarPerfilProps) {
  const medida = { width: tamanho, height: tamanho, borderRadius: tamanho / 2 };

  return (
    <View style={[styles.circulo, medida]}>
      {fotoUrl ? (
        <Image source={{ uri: fotoUrl }} style={medida} />
      ) : iniciais ? (
        <Text style={[styles.iniciais, { fontSize: tamanho * 0.36 }]}>{iniciais}</Text>
      ) : (
        <Feather name="user" size={tamanho * 0.5} color={cores.header} />
      )}
    </View>
  );
}