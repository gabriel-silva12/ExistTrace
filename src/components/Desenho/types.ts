export type Traco = {
    d: string //caminho svg
    cor: string
    espessura: number
}

export type DesenhoSalvo = {
    largura: number
    altura: number
    tracos: Traco[]
}

export type DesenhoProps = {
    desenho: DesenhoSalvo
    tamanho: number
}

