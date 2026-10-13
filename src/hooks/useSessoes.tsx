import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { supabase } from "@/services/supabase";
import type { Sessao } from "@/components/SessaoCard/types";

export const useSessoes = (pacienteId: number | null) => {
    const [sessoes, setSessoes] = useState<Sessao[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    const buscar = useCallback(async () => {
        if (!pacienteId) {
            setCarregando(false)
            return
        }

        setCarregando(true)
        setErro(null)

        const { data, error } = await supabase
        .from("sessao_terapia")
        .select("id, data, emoji, palavra_selecionada, palavra_livre")
        .eq("paciente_id", pacienteId)
        .order("data", { ascending: false })

        if (error) {
            console.error("Erro ao buscar sessoes:", error.message)
            setErro("Não foi possível carregar o histórico")
        } else {
            setSessoes((data ?? []) as Sessao[])
        }

        setCarregando(false)
    }, [pacienteId])

    useFocusEffect(
        useCallback(() => {
            buscar()
        }, [buscar])
    )

    return { sessoes, carregando, erro, recarregar: buscar}
}
