export type Propriedades = {
  titulo: string;
  saudacao?: string; // linha pequena em caixa alta acima do título
  subtitulo?: string; // chip translúcido abaixo do título
  descricao?: string; // texto curto abaixo (até 3 linhas)
  compacto?: boolean; // menos espaço embaixo (telas sem card sobrepondo)

  mostrarAvatar?: boolean; // padrão true
  iniciais?: string; // se vier, substitui o ícone do avatar
  onPressAvatar?: () => void; // se vier, o avatar vira um botão

  onVoltar?: () => void; // se vier, mostra o botão de voltar
  mostrarDecoracao?: boolean; // padrão true
};