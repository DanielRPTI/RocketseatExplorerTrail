import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

// Cookies <-> Formas da gente manter contexto entre reqs

// Testes : Unitatios : teste de uma unica unidade da aplicação Ex.Uma função que formata a data de algo.
// integração: Comunicação entre duas ou mais unidades
// e2e - ponta a ponta: Simula um usuário operando na aplicação{
// front-end : Abre a pagina de login , digite o texto email@dddd.com.br no campo id email
// back-end: chamadas HTTP , websockets. Testa tudo na aplicação}

// Piramide de testes : E2E (não depende de nenhuma tecnologia, não depende de arquitetura )
export async function transactionRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return {
        transactions,
      }
    },
  )

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionParamsSchema.parse(request.params)
    const { sessionId } = request.cookies
    const transactions = await knex('transactions')
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return { transactions }
  })

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (request) => {
      const { sessionId } = request.cookies
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )
    // cria uma let que recebe o cookie da sessionId gerada para validação
    let sessionId = request.cookies.sessionId
    // se não ouver um sessionId ele cria um random uuid e manda uma resposta pro cookie recebendo um sessionId com expiração de 7 dias
    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // seven days
      })
    }
    // Cria a transação apartir de uma sessionId do usuario usando cookies
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
