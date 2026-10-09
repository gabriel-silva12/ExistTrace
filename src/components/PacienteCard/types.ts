export type Paciente = {
  id: number;
  codinome: string;
  idade: number;
  fotoUrl?: string;

};

export type Propriedades = {
  paciente: Paciente;
  onPress?: () => void;
};
