import * as z from 'zod/mini'
import { os } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { Hono } from 'hono'
// import { cors } from 'hono/cors'
import { useDB } from './db.ts'
import { useCommands } from './commands.ts'
import {
  ServersListSchema,
  ServerReadSchema,
  ServerUpdateSchema,
  ServerCreateSchema,
} from '../schemas.ts'

const { servers } = await useDB()

export const router = {
  servers: {
    list: os
      .output(ServersListSchema)
      .handler(async () => {
        const list = await servers.listDetailed()
        const promises = list.map(async (s) => {
          const { ping } = useCommands(s);
          return {
            online: await ping(),
            id: s.id,
            name: s.name,
            ip: s.ip,
            mac: s.mac,
          }
        })
        const res = await Promise.all(promises)
        return res
      }),

    read: os
      .input(z.object({
        id: z.string(),
      }))
      .output(z.optional(ServerReadSchema))
      .handler(async ({ input }) => await servers.read(input.id)),
      
    create: os
      .input(ServerCreateSchema)
      .output(z.boolean())
      .handler(async ({ input }) => {
        let res = true
        await servers.create(input)
          .catch(() => res = false)
        return res
      }),
      
    update: os
      .input(ServerUpdateSchema)
      .output(z.boolean())
      .handler(async ({ input }) => {
        let res = true
        await servers.update(input)
          .catch(() => res = false)
        return res
      }),

    poweron: os
      .input(z.object({
        id: z.string(),
      }))
      .output(z.boolean())
      .handler(async ({ input }) => {
        const server = await servers.readComplete(input.id)

        if (!server) return false

        const { poweron } = useCommands(server)
        const res = await poweron()

        return true
      }),

    poweroff: os
      .input(z.object({
        id: z.string(),
      }))
      .output(z.boolean())
      .handler(async ({ input }) => {
        const server = await servers.readComplete(input.id)

        if (!server) return false

        const { poweroff } = useCommands(server)
        const res = await poweroff()

        return true
      }),
    
  },
}

const handler = new RPCHandler(router)

const api = new Hono()

// api.use(cors())

api.use('/*', async (c, next) => {
  const { matched, response } = await handler.handle(
    c.req.raw,
    { prefix: '/api' },
  )
  if(matched) return c.newResponse(response.body, response)
  await next()
})

export default api
