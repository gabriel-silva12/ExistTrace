import { ComponentProps } from "react";
import { Feather } from "@expo/vector-icons";

export type MenuItemProps = {
  icone: ComponentProps<typeof Feather>["name"];
  titulo: string;
  subtitulo?: string;
  onPress: () => void;
  semBorda?: boolean;
};