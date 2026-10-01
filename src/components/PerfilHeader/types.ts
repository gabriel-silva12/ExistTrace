import { ViewStyle, TextStyle } from "react-native";

export type Propriedades = {
  nome: string;
  saudacao?: string;
  idade?: number;
  estiloContainer?: ViewStyle;
  estiloNome?: TextStyle;
};