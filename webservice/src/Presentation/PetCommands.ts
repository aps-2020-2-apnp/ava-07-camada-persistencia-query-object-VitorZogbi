import { IncomingMessage, ServerResponse } from "http";
import { Command } from "./Command";
import { Pet } from "../Model/Pet"

export class GetPetsCommand implements Command {

  execute(req: IncomingMessage, resp: ServerResponse): void {

    try {
      const registros = Pet.all()
      resp.writeHead(200, { 'Content-Type': 'application/json' })
      resp.end(JSON.stringify(registros))
    } catch (error) {
      resp.end(error)
    }
  }
}


// tslint:disable-next-line: max-classes-per-file
export class GetPetCommand implements Command {

  execute(req: IncomingMessage, resp: ServerResponse): void {

    if(req.url?.indexOf("id=")) {
      try {
        const idString = req.url.slice(req.url.indexOf("=") + 1, req.url.length)
        const id = parseInt(idString, 10)
        const registro = Pet.findById(id)
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify(registro))
      } catch (error) {
        resp.end(error)
      }
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export class PostPetCommand implements Command {

  execute(req: IncomingMessage, resp: ServerResponse) {

    let corpo = ''
    req.on('data', (parte) => corpo += parte)
    req.on('end', () => {
      const {nome, responsavel} = JSON.parse(corpo)
      const pet = new Pet(nome, responsavel)
      if (pet.save()) {
        resp.writeHead(201, { 'Content-Type': 'text/plain' })
        resp.end('Pet Criado')
      } else {
        resp.writeHead(400, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify({ erros: pet.erros }))
      }
    })
  }
}

// tslint:disable-next-line: max-classes-per-file
export class UpdatePetCommand implements Command {

  execute(req: IncomingMessage, resp: ServerResponse): void {
    try {
      if(req.url) {
        const idString = req.url.slice(req.url.indexOf("=") + 1, req.url.length)
        const id = parseInt(idString, 10)
        let corpo = ''
        req.on('data', (parte) => corpo += parte)
        req.on('end', () => {
          const {nome, responsavel} = JSON.parse(corpo)
          const pet = new Pet(nome, responsavel)
          if (pet.update(id)) {
            resp.writeHead(201, { 'Content-Type': 'text/plain' })
            resp.end('Pet Alterado')
          } else {
            resp.writeHead(400, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ erros: pet.erros }))
          }
        })
      } else {
        console.error("Não foi informado um id");
      }
    } catch (error) {
      resp.end(error)
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export class DeletePetCommand implements Command {

  execute(req: IncomingMessage, resp: ServerResponse): void {
    try {
      if(req.url) {
        const idString = req.url.slice(req.url.indexOf("=") + 1, req.url.length)
        const id = parseInt(idString, 10)
        const pet = new Pet("", 0)
        const registro = pet.remove(id)
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify(registro))
      } else {
        console.error("Não foi informado um id");
      }
    } catch (error) {
      resp.end(error)
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
export class GetByName{

  execute (req: IncomingMessage, resp: ServerResponse): void {
    try {
      if(req.url) {
        const valorString = req.url.slice(req.url.indexOf("=") + 1, req.url.length)
        const pet = new Pet("", 0)
        const registro = Pet.queryByName(valorString)
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify(registro))
      } else {
        console.error("Não foi informado um id");
      }
    } catch (error) {
      resp.end(error)
    }
  }
}

export const getPetsCommand = new GetPetsCommand()

export const getPetCommand = new GetPetCommand()

export const postPetCommand = new PostPetCommand()

export const updatePetCommand = new UpdatePetCommand()

export const deletePetCommand = new DeletePetCommand()

export const getByName = new GetByName()
