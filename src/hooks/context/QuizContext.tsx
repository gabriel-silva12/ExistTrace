import React, { createContext, useContext, useState } from "react";
import type { DesenhoSalvo } from "@/components/Desenho/types";

interface QuizContextData {
    desenho: DesenhoSalvo | null
    setDesenho: (desenho: DesenhoSalvo | null) => void
    limparQuiz: () => void
}

const QuizContext = createContext<QuizContextData>({} as QuizContextData)

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    
    const [ desenho, setDesenho ] = useState<DesenhoSalvo | null>(null)

    const limparQuiz = () => setDesenho(null)

    return(
        <QuizContext.Provider value={{ desenho, setDesenho, limparQuiz}}>
            {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => useContext(QuizContext)