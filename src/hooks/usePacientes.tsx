import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { supabase } from "@/services/supabase";
import { Paciente } from "@/components/PacienteCard/types";
import { useAuth } from "./context/AuthContext";

type LinhaPaciente = {
  id: number,
  codinome: string,
  idade: number,
  sessao_terapia: { data: string | null }[]
}


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
    .select("id, codinome, idade, sessao_terapia(data)")
    .eq("psicologo_id", psicologoId)
    .order("codinome")

    if (error) {
      console.error("Erro ao buscar pacientes:", error.message)
    } else {
      const linhas = (data ?? []) as unknown as LinhaPaciente[]
    
      setPacientes(
        linhas.map((paciente) => {
          const datas = paciente.sessao_terapia
            .map((sessao) => sessao.data)
            .filter((data) : data is string => !!data)
            .sort()
          
          return {
            id: paciente.id,
            codinome: paciente.codinome,
            idade: paciente.idade,
            ultimaSessao: datas.length ? datas[datas.length -1] : null

          }
        })
      )
    }
    setCarregando(false)
  }, [psicologoId]);

  useFocusEffect(
    useCallback(() => {
      buscar()
    }, [buscar])
  )

  const atualizarPaciente = async (
    id: number,
    dados: { codinome: string; idade: number }
  ) => {
    const { error } = await supabase.from("paciente").update(dados).eq("id", id);
    if (error) throw error;
    await buscar();
  };

  const excluirPaciente = async (id: number) => {
    const { error } = await supabase.from("paciente").delete().eq("id", id);
    if (error) throw error;
    await buscar();
  };

  return {
    pacientes,
    carregando,
    recarregar: buscar,
    atualizarPaciente,
    excluirPaciente,
  };

  
  
};

