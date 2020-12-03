import { DAO } from "./../Persistence/DAO"

export abstract class Model {

  private dao: DAO
  private _erros: string[] = []

  constructor(dao: DAO) {
    this.dao = dao
  }

  validate(): void {
    this._erros = []
    this._validate(this._erros)
  }

  abstract _validate(erros: string[]): void

  get isValid(): boolean {
    this.validate()
    return this._erros.length === 0
  }

  get erros(): string[] {
    return this._erros
  }

  // Active Record
  save(): boolean {
    if (this.isValid) {
      this.dao.add(this)
      return true
    } else {
      return false
    }
  }

  update(id: number): boolean {
    if (this.isValid) {
      this.dao.update(this, id)
      return true
    } else {
      return false
    }
  }

  // Active Record

  remove(id: number) {
    return this.dao.remove(id)
  }

}
