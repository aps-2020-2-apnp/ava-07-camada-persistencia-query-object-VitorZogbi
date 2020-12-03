export class QueryObject {

  campo:string
  operador: Operador
  valor:any

  constructor(campo: string, operador: Operador, valor: any){

    this.campo = campo
    this.operador = operador
    this.valor = valor
  }

  findByQuery(tabela: string) {

    const consulta = `SELECT * FROM ${tabela} WHERE ${this.campo} ${this.operador} ${this.valor}`
    return consulta
  }
}

export enum Operador {

  igual = "=",
  maior = ">",
  menor = "<",
  like = "LIKE",

}

// tslint:disable-next-line: max-classes-per-file
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
