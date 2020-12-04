import connect, { Database } from 'better-sqlite3'
import { QueryObjectBuilder } from "./QueryObject/index"
import { Operador } from "./QueryObject/index"

// Layer Supertype de Persistencia
// https://martinfowler.com/eaaCatalog/layerSupertype.html
export class DAO {
  private readonly _table: string
  private _db: Database

  constructor(table: string) {
    this._table = table
    this._db = connect('./banco.db')
  }

  findAll(): any[] {
    const SQL = `SELECT * FROM ${this._table}`
    return this._db.prepare(SQL).all()
  }

  findById(id: number): any {
    const SQL = `SELECT * FROM ${this._table} WHERE ${this._table}.id = ${id}`
    return this._db.prepare(SQL).get()
  }

  add(obj: any) {
    const campos = Object.keys(obj)
    const SQL = `INSERT INTO ${this._table} (` +
      campos.join(', ') +
      `) VALUES (` +
      campos.map(campo => `@${campo}`).join(', ') +
      ')'

    this._db.prepare(SQL).run(obj)
  }

  update(obj: any, id: number) {
    const campos = Object.keys(obj)
    const valores = Object.values(obj)

    const SQL = `UPDATE ${this._table} SET ${campos.join('= ?, ')} =? WHERE id = ${id}`

    this._db.prepare(SQL).run(...valores)
  }

  remove(id: number): any {
    const SQL = `DELETE FROM ${this._table} WHERE ${this._table}.id = ${id}`
    return this._db.prepare(SQL).run()
  }

  queryObject(campo: string, operador: Operador, valor: string) {
    const queryBuilder = new QueryObjectBuilder()
    const query = queryBuilder.campo(campo).operador(operador).valor(valor).get()

    const SQL = query.findByQuery(this._table)

    return this._db.prepare(SQL).get()
  }

}
