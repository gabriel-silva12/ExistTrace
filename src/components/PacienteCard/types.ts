export type Paciente = {
  id: number;
  name: string;
};

export type Propriedades = {
  paciente: Paciente;
  onPress?: () => void;
};