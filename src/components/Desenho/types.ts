export type Trace = {
    d: string //caminho svg
    cor: string
    espessura: number
}

export type DesenhoSalvo = {
    largura: number
    altura: number
    traces: Trace[]
}

export type DesenhoProps = {
    desenho: DesenhoSalvo
    tamanho: number
}

