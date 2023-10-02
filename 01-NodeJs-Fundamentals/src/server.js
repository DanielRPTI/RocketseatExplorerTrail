import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
/*requisições em http 
// METHODOS 
// URL
// MEHTODO + URL = GET/USERS
//- feitas través de urls ou methoodos 

// GET => Buscar informação no back-end
// POST => Criar algo no back_end
// PUT => Atualiar algo no back
// PATCH => Atualização especifica de apenas um recurso no back
// DELETE => Deleta algo no back

// Stateful = salva de forma local sem memoria ela pode perder seus dados por estar localmente - Stateless  = salva memoria em BD 
//JSON - JavaScript Object Notation 
// Cabeçalhos (Req / Res ) => Metadados(Informações adicionais que não tem a ver com o dado retornado do back-end) utilizamos o setHeader para enviar esses dados para o front 

//HTTP STATUS CODE => 100 - 199 (information response)
// 200 - 299 - successful responses
// 300 - 299 redirect responses | 400 - 499 Client error response 
 500 - 599 Server error responses */

//UUID => Unique universal ID 

const database = new Database()

const server = http.createServer(async (req, res) => {
  const {method, url} = req

  await json(req, res)

  if ( method === 'GET' && url === '/users'){
    const users = database.select('users')

    return res   
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if ( method === 'POST' && url === '/users'){
    const {name, email} = req.body
    const user = {
      id: randomUUID(),
      name,
      email,
    }
    database.insert('users',  user)
    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)


