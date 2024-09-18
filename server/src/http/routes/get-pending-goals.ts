import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getGoals } from '../../services/get-goals'

export const getGoalRoute: FastifyPluginAsyncZod = async app => {
  app.get('/goals', async () => {
    const { pendingGoals } = await getGoals()
    return pendingGoals
  })
}
