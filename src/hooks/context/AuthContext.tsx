import { supabase } from "@/services/supabase";
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

interface PerfilPsicologo {
    id: string,
    nome: string
}

interface AuthContextData {
    perfil: PerfilPsicologo | null,
    loading: boolean,
    loginComSupabase: (email : string, password: string) => Promise<any>,
    cadastrarComSupabase: (nome: string, email: string, password: string) => Promise<any>
}

// balão de contexto?

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// provedor de dados globais
export const AuthProvider: React.FC< { children: React.ReactNode}> = ({ children }) => {
    const [perfil, setPerfil] = useState<PerfilPsicologo | null>(null)
    const [loading, setLoading] = useState(false)
    
    const buscarPerfilDoBanco = async (userId : string) => {
        try {
            const {data, error} = await supabase
            .from("psicologo")
            .select("id, nome")
            .eq("id", userId)
            .single()

            if (data && !error) setPerfil(data)
        } catch (err) {
            console.error(err)
        }
    }

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

        if (data?.user) {
            await buscarPerfilDoBanco(data.user.id)
        }

        setLoading(false)
        return data //retorna os dados para o usuario logado
    }

    const cadastrarComSupabase = async (nome: string, email: string, password: string) => {
        setLoading(true)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            //envia nome nos metadados para a trigger do banco ler
            options: {
                data: {
                    nome: nome
                }
            }
        })

        setLoading(false)

        if (error) {
            throw error
        }

        return data
    }

     //Busca automática se o usuário já abrir o app logado
    useEffect(() => {
        const checarSessaoAtiva = async () => {
            const { data: {user} } = await supabase.auth.getUser(         )
            if (user && !perfil) {
                await buscarPerfilDoBanco(user.id)
            }
        }
        checarSessaoAtiva()
    }, [])

    return (
        <AuthContext.Provider value={{ perfil, loading, loginComSupabase, cadastrarComSupabase }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
