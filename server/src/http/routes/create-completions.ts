import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoalCompletion } from '../../services/create-goal-completion'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const result = await createGoalCompletion({
        goalId: request.body.goalId,
      })
      reply.send(result)
    }
  )
}
