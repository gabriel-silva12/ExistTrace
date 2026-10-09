import { useState, useEffect } from "react";
import { supabase } from "@/services/supabase";
import { Paciente } from "@/components/PacienteCard/types";
import { useAuth } from "./context/AuthContext";

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [carregando, setCarregando] = useState(true);

  const {perfil} = useAuth()

  useEffect(() => {
    const buscarPacientes = async () => {
      
      if(!perfil || !perfil.id) {
        setCarregando(false)
        return
      }

      setCarregando(true)

      const { data, error } = await supabase
      .from("paciente")
      .select("id, codinome, idade")
      .eq("psicologo_id", perfil.id) //id seguro de contexto

      if ( data && !error) {
        setPacientes(
          data.map((paciente) => ({
            id: paciente.id,
            codinome: paciente.codinome,
            idade: paciente.idade
          }))
        )
        console.log("Pacientes carregados: ", data)
      } else if (error) {
        console.error("Erro ao buscar pacientes: ", error)
      }

      setCarregando(false)
    }

    buscarPacientes() //importante invocar a função depois de definir lá no useEffect

  }, [perfil]); //perfil passa como argumento de disparo para o efeito

  return { pacientes, carregando };
}
