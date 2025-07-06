import { Hono } from 'hono'
import { useData } from '../providers/data.ts'

const api = new Hono()

const data = await useData()

api.get('/server/list', (c) => {
  const servers = data.servers.map(({ password, user, ...rest }) => rest)
  
  return c.json(servers)
})

export default api
