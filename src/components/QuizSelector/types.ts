

export interface QuizOption {
    id: string
    title?: string
    subtitle?: string
}

export interface QuizSelectorSingleProps {
   selectionMode: "single"
   selectedId: string | null
   onSelect: (ids: string | null) => void
}

export interface QuizSelectorMultipleProps {
    selectionMode: "multiple"
    selectedIds : string[]
    onSelect: (ids: string[]) => void
}


//Chamam isso de "União Discriminada" Typescritp Discriminated Union
export type QuizSelectorProps = (QuizSelectorSingleProps | QuizSelectorMultipleProps) & {
    options: QuizOption[]
    columns?: number
    cardHeight?: number
    gap?: number

}



export interface QuizCardProps {
    option: QuizOption
    selected: boolean
    onPress: () => void
    height: number
}