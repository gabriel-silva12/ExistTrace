export type Sessao = {
  id: number;
  data?: string | null;
  emoji: string;
  palavra_fixa: string;
  palavra_livre: string;
};

export type Propriedades = {
  sessao: Sessao;
};