import fastify from 'fastify'
import { knex } from './database'
import { env } from './index'
const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .where('amount', 10000)
    .select('*')

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Http Server Running!')
  })
