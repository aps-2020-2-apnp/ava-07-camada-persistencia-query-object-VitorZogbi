import { DAO } from "./DAO"
import  { Pet } from "./../Model/Pet"

export class PetDAO extends DAO {

  constructor() {
    super('pets')
  }

  add(pet: Pet) {
    const {nome, responsavel} = pet
    super.add({nome, responsavel})
  }

  update(pet: Pet, id: number) {
    const {nome, responsavel} = pet
    super.update({nome, responsavel}, id)
  }
}
