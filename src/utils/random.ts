export function sortearItens<T>(lista: T[], quantidade: number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, quantidade);
}

export function sortearBalanceado<T>(
  positivos: T[],
  negativos: T[],
  quantidadePorGrupo: number
): T[] {
  const sorteados = [
    ...sortearItens(positivos, quantidadePorGrupo),
    ...sortearItens(negativos, quantidadePorGrupo),
  ];

  return sortearItens(sorteados, sorteados.length);
}