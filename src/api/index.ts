import { Hono } from 'hono'
import { useData } from '../providers/data.ts'
import { useCommands } from '../providers/commands.ts'

const api = new Hono()

const { servers } = await useData()

api.get('/server/list', async (c) => {
  const promises = servers.map(async (server) => {
    const { ping } = useCommands(server);
    return {
      online: await ping(),
      id: server.id,
      name: server.name,
      ip: server.ip,
      mac: server.mac,
    }
  })
  const res = await Promise.all(promises)
  return c.json(res)
})

api.get('/server/:id/poweron', async (c) => {
  const id = c.req.param('id')
  const server = servers?.find((item) => item.id == id)

  if (!server) return c.notFound()

  console.log("[ INFO ] Powering on:", server.id)

  const { poweron } = useCommands(server)
  const res = await poweron()

  console.log("[ INFO ] Power on:", server.id, res)
  console.log(res)
  return c.json({success: res})
})

api.get('/server/:id/poweroff', async (c) => {
  const id = c.req.param('id')
  const server = servers?.find((item) => item.id == id)

  if (!server) return c.notFound()

  console.log("[ INFO ] Powering off:", server.id)

  const { poweroff } = useCommands(server)
  const res = await poweroff()

  console.log("[ INFO ] Power off:", server.id, res)

  return c.json({success: res})
})

export default api
