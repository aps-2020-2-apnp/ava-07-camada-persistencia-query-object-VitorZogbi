import { Model } from "./Model";
import { Usuario } from "./Usuario"
import { PetDAO } from "../Persistence/PetDAO"

const dao = new PetDAO()

export class Pet extends Model {

  id?: number
  nome: string
  responsavel: number

  constructor(nome: string, responsavel: number, id?: number) {
    super();
    this.id = id
    this.nome = nome
    this.responsavel = responsavel
  }

  _validate(erros: string[]): void {
    if (!Usuario.findById(this.responsavel)) {
      erros.push(`Pet precisa de um responsável cadastrado`)
    }
  }

  static all(): Pet[] {
    return dao.findAll()
  }

  static findById(id: number): Pet {
    return dao.findById(id)
  }

  // Active Record
  save(): boolean {
    if (this.isValid) {
      dao.add(this)
      return true
    } else {
      return false
    }
  }

  update(id: number): boolean {
    if (this.isValid) {
      dao.update(this, id)
      return true
    } else {
      return false
    }
  }

  // Active Record

  static delById(id: number) {
    return dao.delById(id)
  }
}
