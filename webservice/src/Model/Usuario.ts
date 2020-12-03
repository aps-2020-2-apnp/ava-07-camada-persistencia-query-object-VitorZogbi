import { Model } from './Model'
import { UsuarioDAO } from '../Persistence/UsuarioDAO'

const dao = new UsuarioDAO()

export class Usuario extends Model {

  dao = dao
  id?: number
  nome: string
  sobrenome?: string
  constructor(nome: string, sobrenome?: string, id?: number) {
    super()
    // VALIDAR ANTES
    // if (nome.length < 2) {
    //   throw new Error(`Nome deve ter pelo menos 2 caracteres (recebido: ${nome})`)
    // }
    this.id = id
    this.nome = nome
    this.sobrenome = sobrenome
  }

  _validate(erros: string[]): void {
    if (this.nome.length < 2) {
      erros.push(`Nome deve ter pelo menos 2 caracteres`)
    }
  }

  static all(): Usuario[] {
    return dao.findAll()
  }

  static findById(id: number): Usuario {
    return dao.findById(id)
  }
}
