import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { supabase } from "@/services/supabase";
import { Paciente } from "@/components/PacienteCard/types";
import { useAuth } from "./context/AuthContext";

export const usePacientes = () => {
  const { perfil } = useAuth();
  const psicologoId = perfil?.id;

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscar = useCallback(async () => {
    if (!psicologoId) {
      setCarregando(false);
      return;
    }
    setCarregando(true);

    const { data, error } = await supabase
      .from("paciente")
      .select("id, codinome, idade")
      .eq("psicologo_id", psicologoId)
      .order("codinome");

    if (error) console.error("Erro ao buscar pacientes:", error.message)
    else setPacientes((data ?? []) as Paciente[])

    setCarregando(false)
  }, [psicologoId]);

  useFocusEffect(
    useCallback(() => {
      buscar()
    }, [buscar])
  )

  return { pacientes, carregando, recarregar: buscar}
  
};
