import { Operador, QueryObject } from "./QueryObject"

export class QueryObjectBuilder {

  private query: QueryObject

  constructor() {
    this.query = new QueryObject("", Operador.igual,"")
  }

  reset() {
    this.query = new QueryObject("", Operador.igual,"")
  }

  campo(campo: string) {
    this.query.campo = campo
    return this
  }

  operador(operador: Operador) {
    this.query.operador = operador
    return this
  }

  valor(valor: any) {
    this.query.valor = valor
    return this
  }

  get(): QueryObject {
    return this.query
  }
}
