/// <reference lib="deno.ns" />
import { ensureFile } from 'fs/ensure-file'
import { readTextFile } from 'fs/unstable-read-text-file'
import { writeTextFile } from 'fs/unstable-write-text-file'
import { ServerSchema } from '../schemas.ts'
import type { Server } from '../types.ts'

async function useData() {
  const dataFilePath = './data/servers.json'

  await ensureFile(dataFilePath)

  let fileText = await readTextFile(dataFilePath)

  try {
    JSON.parse(fileText)
  } catch(_err) {
    await writeTextFile(dataFilePath, "[]");
    fileText = "[]";
  }
    
  const { success, data } = ServerSchema.array().safeParse(
    JSON.parse(fileText),
  )

  if (!success || !data) {
    console.log('[ ERROR ] Invalid data file format!')
  }

  const servers = !success || !data ? [] : data

  async function writeServersDataFile(servers: Server[]) {
    return await writeTextFile(
      dataFilePath,
      JSON.stringify(servers, null, '  '),
    )
  }

  async function addServer(server: Omit<Server, 'id'>) {

    servers.push({
      id: crypto.randomUUID(),
      ...server,
    })
    await writeServersDataFile(servers)
  }

  async function updateServer(server: Server) {
    const serverIdx = servers.findIndex(
      (item: Server) => item.id === server.id,
    )

    servers[serverIdx] = server

    await writeServersDataFile(servers)
  }

  async function deleteServer(id: string) {
    console.log('deleteServer:', id)
    const serverIdx = servers.findIndex((item: Server) => item.id === id)

    servers.splice(serverIdx, 1)

    await writeServersDataFile(servers)
  }

  return {
    servers,
    addServer,
    updateServer,
    deleteServer,
  }
}

export { useData }
