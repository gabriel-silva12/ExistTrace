// utils/date.ts

/**
 * Converte uma string de data para o padrão brasileiro DD/MM/AAAA.
 * Evita o bug de fuso horário que subtrai 1 dia no iOS/Android.
 */
export const formatarParaDataBR = (dataString: string | undefined | null): string => {
  if (!dataString) {
    return new Date().toLocaleDateString("pt-BR");
  }

  try {
    let stringNormalizada = dataString.replace(" ", "T");

    // SOLUÇÃO DO FUSO HORÁRIO: Se for apenas data (Ex: "2026-09-21", tamanho 10)
    // Forçamos o horário para meio-dia (12:00) local para que o fuso (ex: -3h) nunca mude o dia.
    if (stringNormalizada.length === 10 && stringNormalizada.includes("-")) {
      stringNormalizada = `${stringNormalizada}T12:00:00`;
    }

    const dataObjeto = new Date(stringNormalizada);

    // Se a string contiver fuso completo e falhar no Parse nativo
    if (isNaN(dataObjeto.getTime())) {
      const timestamp = Date.parse(dataString);
      if (!isNaN(timestamp)) {
        return new Date(timestamp).toLocaleDateString("pt-BR");
      }
      return new Date().toLocaleDateString("pt-BR");
    }

    return dataObjeto.toLocaleDateString("pt-BR");
  } catch {
    return new Date().toLocaleDateString("pt-BR");
  }
};
