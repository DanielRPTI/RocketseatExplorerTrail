import http from 'node:http'
//requisições em http 
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
// 500 - 599 Server error responses

const users  = []

const server = http.createServer((req, res) => {
  const {method, url} = req

  if ( method === 'GET' && url === '/users'){
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(users))
  }

  if ( method === 'POST' && url === '/users'){
    users.push({
      id: 1,
      nome: 'Daniel rosa',
      email:'drjunim@rocketeat.com.br'
    })
    return res.status(201).end("Criação de users")
  }

  return res.writeHead(404).end()
})

server.listen(3333)


