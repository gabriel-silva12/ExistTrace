import { supabase } from "./supabase";

export type Sessao = {
    id: number
    data: string
    emoji: string
    palavra_fixa: string
    palavra_livre: string
}

type NovaSessao = {
    psicologoId: string
    pacienteId: number
    emoji: string
    palavraFixa: string
    palavraLivre: string
}

export async function registrarSessao(novoRegistro: NovaSessao) {
    const { data, error } = await supabase
    .from("sessao_terapia")
    .insert({
        psicologo_id: novoRegistro.psicologoId,
        paciente_id: novoRegistro.pacienteId,
        emoji: novoRegistro.emoji,
        palavra_livre: novoRegistro.palavraLivre
    })
    .select("id, data, emoji, palavra_fixa, palavra_livre")
    .single()

    if (error) throw error
    return data as Sessao
}

export async function listarSessoes(pacienteId: number) {
    const { data, error } = await supabase
    .from("sessao_terapia")
    .select("id, data, emoji, palavra_fixa, palavra_livre")
    .eq("paciente_id", pacienteId)
    .order("data", {ascending: false}) //esse é novo
    
    if (error) throw error

    return (data ?? []) as Sessao[]
}