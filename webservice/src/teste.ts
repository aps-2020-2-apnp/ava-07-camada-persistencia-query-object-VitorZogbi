import { DAO } from './Persistence/DAO'
import { UsuarioDAO } from './Persistence/UsuarioDAO'
import { Usuario } from './Model/Usuario'
import { PetDAO } from './Persistence/PetDAO'
import { Operador } from './Persistence/QueryObject/index'
import { QueryObjectBuilder } from './Persistence/QueryObject/index'

const dao = new DAO('usuarios')
// const rows = dao.findAll()
// console.log(rows)
// dao.add({nome: 'Jose', sobrenome: 'Ferreira'})

const usuario = new Usuario('F', 'Soares')
const daoUsuario = new UsuarioDAO()
// console.log(daoUsuario.findAll())
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
console.log(registros);

const queryBuilder = new QueryObjectBuilder()
const query = queryBuilder.campo("nome").operador(Operador.like).valor("'mia'").get()
const registro = daoPet.queryObject(query.campo, query.operador, query.valor)
console.log(registro);












