declare namespace LexadorNamespace {
  export interface RetornoLexadorInterface<S, E> { 
    simbolos: S[];
    erros: E[];
  }

  export type ErrorLexadorType = {
    linha: number;
    coluna: number;
    mensagem: string;
  }
}

