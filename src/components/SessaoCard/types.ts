export type Sessao = {
  id: number;
  data?: string | null;
  emoji: string;
  palavra_selecionada: string;
  palavra_livre: string;
};

export type Propriedades = {
  sessao: Sessao;
};