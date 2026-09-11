import { supabase } from "@/services/supabase"
import { useState } from "react"

export const useAuth = () => {
    const [loading, setLoading] = useState(false)

    const loginComSupabase = async (email: string, password: string) => {
        
        setLoading(true)
        //chamanda no backend
        const {data, error} = await supabase.auth.signInWithPassword(
            {
            email,
            password
            }
        )
        //se login sucesso ou erro carregando é falso
        setLoading(false)

        if (error){
            throw error
        }

        return data //retorna os dados para o usuario logado
    }

    return {loginComSupabase, loading }

}