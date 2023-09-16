/// <reference path="./index.d.ts" />
import { SimboloInterface } from '../simbolo';

export class Lexador {

  simbolos: SimboloInterface[] = []
  erros: LexadorNamespace.ErrorLexadorType[] = []

  mapear(codigo: string[]): LexadorNamespace.RetornoLexadorInterface<SimboloInterface, LexadorNamespace.ErrorLexadorType> {
    return {
      simbolos: this.simbolos,
      erros: this.erros
    }
  }
}