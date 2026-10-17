import { DesenhoSalvo } from "../Desenho/types";

export type Sessao = {
  id: number;
  data?: string | null;
  emoji: string;
  palavra_selecionada: string;
  palavra_livre: string;
  desenho?: DesenhoSalvo | null
};

export type Propriedades = {
  sessao: Sessao;
};