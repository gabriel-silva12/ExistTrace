export type Paciente = {
  id: number;
  name: string;
  fotoUrl?: string;
};

export type Propriedades = {
  paciente: Paciente;
  onPress?: () => void;
};
