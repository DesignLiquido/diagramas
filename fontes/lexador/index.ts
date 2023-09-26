/// <reference path="./index.d.ts" />
import { SimboloInterface } from '../simbolo';
import tiposDeSimbolos from '../tipos-de-simbolos';
import { palavrasReservadas } from './palavras-reservadas';
import { Simbolo } from './simbolo';

export class Lexador {

  simbolos: SimboloInterface[] = []
  erros: LexadorNamespace.ErrorLexadorType[] = []
  inicioSimbolo: number = 0
  atual: number = 0
  linha: number = 1
  codigo: string = ''

  private eFinalDoCodigo(): boolean {
    return this.atual >= this.codigo.length
  }

  private simboloAtual(): string {
    return this.codigo.charAt(this.atual)
  }

  private adicionarSimbolo(tipo: string, literal: any = null, lexema: string = ""): void {
    this.simbolos.push(new Simbolo(lexema, tipo, literal, this.linha, this.atual - this.inicioSimbolo))
  }

  private avancar(): string {
    this.atual++
    return this.codigo.charAt(this.atual - 1)
  }

  private eDigito(caractere: string): boolean {
    return caractere >= '0' && caractere <= '9'
  }

  private proximoSimbolo(): string {
    if (this.eFinalDoCodigo()) return '\0'
    return this.codigo.charAt(this.atual)
  }

  private analisarNumero(): void { 
    while (this.eDigito(this.simboloAtual())) {
      this.avancar();
  }
  if (this.simboloAtual() == '.' && this.eDigito(this.proximoSimbolo())) {
      this.avancar();

      while (this.eDigito(this.simboloAtual())) {
          this.avancar();
      }
  }
  const numeroCompleto = this.codigo.substring(this.inicioSimbolo, this.atual);
  this.adicionarSimbolo(tiposDeSimbolos.NUMERO, parseFloat(numeroCompleto), numeroCompleto);
  }
  
  private eAlfabeto(caractere: string): boolean {
    // Expressão regular para validar caracteres Unicode e emojis
    const regexUnicode = /^[\p{Letter}\p{Emoji}_]+$/u;
    
    return regexUnicode.test(caractere);
  }

  private eAlfabetoOuDigito(caractere: string): boolean {
    return this.eAlfabeto(caractere) || this.eDigito(caractere);
  }
  
  private identificarPalavraChave(): void {
    while (this.eAlfabetoOuDigito(this.simboloAtual())) {
        this.avancar();
    }

    const codigo: string = this.codigo.substring(this.inicioSimbolo, this.atual);

    const codigoMinusculo = codigo.toLowerCase();

    const tipo: string =
        codigoMinusculo in palavrasReservadas ? palavrasReservadas[codigoMinusculo] : tiposDeSimbolos.IDENTIFICADOR;

    this.adicionarSimbolo(tipo, codigo, codigo);
}


  private analisarSimbolo(): void { 
    const caractere = this.simboloAtual()

    switch (caractere) {
      case '[':
        this.adicionarSimbolo(tiposDeSimbolos.ABRE_COLCHETE, null, '[')
        this.avancar()
        break;
      case ']':
        this.adicionarSimbolo(tiposDeSimbolos.FECHA_COLCHETE, null, ']')
        this.avancar()
        break;
      case '{':
        this.adicionarSimbolo(tiposDeSimbolos.ABRE_CHAVE, null, '{')
        this.avancar()
        break;
      case '}':
        this.adicionarSimbolo(tiposDeSimbolos.FECHA_CHAVE, null, '}')
        this.avancar()
        break;
      case '"':
        this.adicionarSimbolo(tiposDeSimbolos.APOSTROFO, null, '"')
        this.avancar()
        break;
      case '(':
        this.adicionarSimbolo(tiposDeSimbolos.ABRE_PARENTESES, null, '(')
        this.avancar()
        break;
      case ')':
        this.adicionarSimbolo(tiposDeSimbolos.FECHA_PARENTESES, null, ')')
        this.avancar()
        break;
      case '-':
        this.avancar()
        if (this.proximoSimbolo() === '-') {
          this.avancar()
          if (this.proximoSimbolo() === '-') {
            this.avancar()
            this.adicionarSimbolo(tiposDeSimbolos.MARKDOWN, null, '---')
            break;
          }
        }
      case '\n':
        this.adicionarSimbolo(tiposDeSimbolos.QUEBRA_LINHA, null, '\n')
        this.avancar()
        this.linha++
        break;
      case ':':
        this.avancar()
        this.adicionarSimbolo(tiposDeSimbolos.DOIS_PONTOS, null, ':')
        break;
      case ' ':
      case '\r':
      case '\t':
      case '':
      case '\0':
        this.avancar()
        break;
      default:
        if (this.eDigito(caractere)) this.analisarNumero()
        else if (this.eAlfabeto(caractere)) this.identificarPalavraChave()
        else {
          this.erros.push({
            coluna: this.atual,
            linha: this.linha,
            mensagem: `Caractere inesperado: ${caractere}`
          })
          this.avancar()
        }
        break;
    }
  }




  mapear(codigo: string[]): LexadorNamespace.RetornoLexadorInterface<SimboloInterface, LexadorNamespace.ErrorLexadorType> {
    
    this.codigo = codigo.join('\n') || ''

    if (codigo.length > 0) {
      this.codigo += '\n'

      while(!this.eFinalDoCodigo())
      {
        this.inicioSimbolo = this.atual
        this.analisarSimbolo()
      }
   }

    return {
      simbolos: this.simbolos,
      erros: this.erros
    }
  }
}