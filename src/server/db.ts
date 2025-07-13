import { JSONFilePreset } from 'lowdb/node'
import {
  ServerCreateSchema,
  ServerUpdateSchema,
} from '../schemas.ts'
import type { Server, ServerUpdateInput } from '../types.ts'

type DBData = {
  servers: Server[],
}

const defaultDBData: DBData = {
  servers: []
}

async function useDB() {
  const dbFilePath = './data/db.json'
  
  const db = await JSONFilePreset<DBData>(dbFilePath, defaultDBData)
  
  await db.read()

  async function listServers() {
    await db.read()
    return db.data.servers.map(({ user, password, ...server}) => (server))
  }

  async function listDetailedServers() {
    await db.read()
    return db.data.servers
  }

  async function readServer(id: string) {
    await db.read()
    const server = db.data.servers.find((server) => server.id === id)
    if(!server) return undefined
    const { password, ...rest } = server
    return rest
  }

  async function readCompleteServer(id: string) {
    await db.read()
    const server = db.data.servers.find((server) => server.id === id)
    if(!server) return undefined
    return server
  }

  async function createServer(server: Omit<Server, 'id'>) {
    const { success, data } =  ServerCreateSchema.safeParse(server)

    if(!success)
      throw Error('Invalid server data!')

    db.data.servers.push({
      id: crypto.randomUUID(),
      ...data,
    })
  
    await db.write()
  }

  async function updateServer(server: ServerUpdateInput) {
    const { success, data } = ServerUpdateSchema.safeParse(server)

    if(!success)
      throw Error('Invalid server data!')
  
    const serverIdx =  db.data.servers.findIndex(
      (item: Server) => item.id === data.id,
    )

    db.data.servers[serverIdx] = {
      ...db.data.servers[serverIdx],
      ...data,
    }

    await db.write()
  }

  async function deleteServer(id: string) {
    const serverIdx = db.data.servers.findIndex((item: Server) => item.id === id)

    if(serverIdx < 0)
      throw Error('Invalid server data!')

    db.data.servers.splice(serverIdx, 1)

    await db.write()
  }

  return {
    servers: {
      list: listServers,
      listDetailed: listDetailedServers,
      read: readServer,
      readComplete: readCompleteServer,
      create: createServer,
      update: updateServer,
      delete: deleteServer,
    }
  }
}

export { useDB }
