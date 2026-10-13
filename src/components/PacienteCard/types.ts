export type Paciente = {
  id: number;
  codinome: string;
  idade: number;
  fotoUrl?: string;
  ultimaSessao?: string | null

};

export type Propriedades = {
  paciente: Paciente;
  onPress?: () => void;
};
