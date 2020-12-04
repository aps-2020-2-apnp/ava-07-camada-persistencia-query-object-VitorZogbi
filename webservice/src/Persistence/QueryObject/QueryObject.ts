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
