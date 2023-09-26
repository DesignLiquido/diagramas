import { Lexador } from '../../fontes/lexador'

describe('Lexador Diagramas', () => {
  describe('Mapear()', () => { 
    let lexador: Lexador

    beforeEach(() => {
      lexador = new Lexador()
    })

    it('deve retornar um array vazio quando não houver código', () => {
      const codigo: string[] = []
      const resultado = lexador.mapear(codigo)
      expect(resultado).toEqual({ simbolos: [], erros: [] })
    })

    it('Node de fluxograma padrão', () => { 
      const codigo: string[] = [
        '---',
        'title: Node',
        '---',
        'flowchart LR',
        '    id',
      ]
      const resultado = lexador.mapear(codigo)

      expect(resultado.erros).toStrictEqual([])
      expect(resultado.simbolos.length).toEqual(13)
    })
  })
})