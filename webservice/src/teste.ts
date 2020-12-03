import { DAO } from './Persistence/DAO'
import { UsuarioDAO } from './Persistence/UsuarioDAO'
import { Usuario } from './Model/Usuario'
import { PetDAO } from './Persistence/PetDAO'
import { Operador } from './Persistence/QueryObject'

const dao = new DAO('usuarios')
// const rows = dao.findAll()
// console.log(rows)
// dao.add({nome: 'Jose', sobrenome: 'Ferreira'})

const usuario = new Usuario('F', 'Soares')
const daoUsuario = new UsuarioDAO()
//console.log(daoUsuario.findAll())
// if (usuario.isValid) {
//   daoUsuario.add(usuario)
// } else {
//   console.log(usuario.erros)
// }

const usuarioById = daoUsuario.findById(3)
console.log(usuarioById);

const daoPet = new PetDAO()
const petById = daoPet.findById(3)
console.log(petById);

const registros = daoPet.findAll()
console.log(daoPet.findAll());

const registro = daoPet.queryObject("nome", Operador.like, "mia")
console.log(registro);












