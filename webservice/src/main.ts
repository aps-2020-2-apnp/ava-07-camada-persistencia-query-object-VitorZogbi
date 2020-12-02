import { createServer, METHODS } from 'http'
import { FrontController, Method } from './Presentation/FrontController'
import { todosUsuariosCommand, novoUsuarioCommand} from './Presentation/UsuarioCommands'
import * as PetCommands from './Presentation/PetCommands'

const controller = new FrontController()

controller.register(Method.GET, '/nada')
controller.register(Method.GET, '/usuarios', todosUsuariosCommand)
controller.register(Method.POST, '/usuario', novoUsuarioCommand)
controller.register(Method.GET, '/pets', PetCommands.getPetsCommand)
controller.register(Method.GET, '/pet', PetCommands.getPetCommand)
controller.register(Method.POST, '/pet', PetCommands.postPetCommand)
controller.register(Method.PUT, '/pet', PetCommands.updatePetCommand)
controller.register(Method.DELETE, '/pet', PetCommands.deletePetCommand)

const port = 9999
const server = createServer((req, resp) => controller.handle(req, resp))
server.listen(port, () => {
  console.log('Server running at http://localhost:9999')
})

