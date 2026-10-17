import { ReactNode } from "react";

export type CampoInfo = {
  label: string;
  value: string;
};

export type Propriedades = {
  titulo: string;
  campos: CampoInfo[];
  onPress?: () => void;
   avatar?: {
    fotoUrl?: string;
  };
  children?: ReactNode
};