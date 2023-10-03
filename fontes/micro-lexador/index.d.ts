declare namespace MicroLexadorNamespace {
  export interface RetornoMicroLexadorInterface<S, E> {
    simbolos: S[];
    erros: E[];
  }

  export type ErrorLexadorType = {
    linha: number;
    coluna: number;
    mensagem: string;
  }
}
