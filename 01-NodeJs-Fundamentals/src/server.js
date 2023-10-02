import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

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
/*Query Parameters: URL Stateful -> filtros , paginação - que não são obrigatorios apenas bucas 
Route Parameters: indentificação de recurso 
Request Paramenters: envio de formularios (HTTPS)
http://loalchost:3333/user?userID=1&name=Diego/
Route : http://loalchost:3333/user/1 */
//UUID => Unique universal ID 


const server = http.createServer(async (req, res) => {
  const {method, url} = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route){
    const routeParams = req.url.match(route.path)

    const {query, ... params} = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }


  return res.writeHead(404).end()
})

server.listen(3333)


