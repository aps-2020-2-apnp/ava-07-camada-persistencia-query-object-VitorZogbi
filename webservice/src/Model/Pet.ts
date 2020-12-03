import { Model } from "./Model";
import { Usuario } from "./Usuario"
import { PetDAO } from "../Persistence/PetDAO"

const dao = new PetDAO()

export class Pet extends Model {

  dao = dao
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
}
