import { useState, useEffect } from "react";
import { supabase } from "@/services/supabase";

type Paciente = {
  id: number;
  name: string;
  ficha: string;
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const buscarPacientes = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setCarregando(false)
        return
      }

      const { data, error } = await supabase
        .from("paciente")
        .select("id, nome")
        .eq("psicologo_id", user.id)

      if (data && !error) {
        setPacientes(
          data.map((p) => ({
            id: p.id,
            name: p.nome,
            ficha: "Visualizar"
          }))
        )
      } else if (error) {
        console.error(error)
      }

      setCarregando(false)
    }

    buscarPacientes()
  }, [])

  return { pacientes, carregando }
}