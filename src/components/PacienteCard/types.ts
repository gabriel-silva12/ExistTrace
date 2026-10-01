export type Paciente = {
  id: number;
  name: string;
  idade: number;
  fotoUrl?: string;

};

export type Propriedades = {
  paciente: Paciente;
  onPress?: () => void;
};
