import { SimboloInterface } from "../simbolo";

export class Simbolo implements SimboloInterface {
  lexema: string;
  tipo: string;
  literal: string;
  linha: number;
  coluna: number;

  constructor(lexema: string, tipo: string, literal: string, linha: number, coluna: number) {
    this.lexema = lexema
    this.tipo = tipo
    this.literal = literal
    this.linha = linha
    this.coluna = coluna
  }
}