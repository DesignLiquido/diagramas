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
  })
})