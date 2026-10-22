import { DesenhoSalvo } from "../Desenho/types";
export type CargaEmoji = "NEGATIVA" | "MISTA" | "POSITIVA";



export type Sessao = {
  id: number;
  data?: string | null;
  emoji: string;
  carga_emoji: CargaEmoji | null
  palavra_selecionada: string;
  palavra_livre: string;
  desenho?: DesenhoSalvo | null
};

export type Propriedades = {
  sessao: Sessao;
};