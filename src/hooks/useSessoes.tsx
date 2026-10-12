import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { listarSessoes, Sessao } from "@/services/sessaoService"


//Callback?  Ouvi falar em javascript mas nao em typescript ou react no caso, tenho que pesquisar;

export const useSessoes = (pacienteId: number | null) => {
    const [sessoes, setSessoes] = useState<Sessao[]>([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    const buscar = useCallback(async () => {
        
        if (pacienteId == null || Number.isNaN(pacienteId)) {
            setCarregando(false)
            return
        }

        setCarregando(true)
        setErro(null)

        try {
            setSessoes(await listarSessoes(pacienteId))
        } catch (e) {
            console.error("Erro ao buscar sessões:", e)
            setErro("Não foi possivel carregar o histórico")
        } finally {
            setCarregando(false)
        }

    }, [pacienteId])

    //roda toda vez que a tela ganha foco
    useFocusEffect(
        useCallback(() => {
            buscar()
        }, [buscar])
    )

    return { sessoes, carregando, erro, recarregar: buscar }

}