import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { orpc } from './providers/orpc.ts'
import type {
  Alert,
  ServerList,
  // ServerUpdateInput,
  ServerUpdate,
  ServerRead,
  ServerCreateInput,
} from './types.ts'

export const useLayoutStore = defineStore('layout', () => {

  const alert = reactive<Alert>({
    isVisible: false,
    type: 'success',
    message: '',
  })

  function setAlert(payload: Omit<Alert, 'isVisible'>) {
    alert.message = payload.message
    alert.type = payload.type
    alert.isVisible = true
  }

  function showSuccessAlert(message: string) {
    setAlert({type: 'success', message})
  }

  function showDangerAlert(message: string) {
    setAlert({type: 'danger', message})
  }

  return {
    alert,
    setAlert,
    showSuccessAlert,
    showDangerAlert,
  }
})

export const useServersStore = defineStore('servers', () => {

  const servers = reactive<ServerList>([])

  async function list() {
    const res = await orpc.servers.list()

    if(!res) return []

    servers.length = 0
    Object.assign(servers, res)

    return res
  }

  async function read(id: string): Promise<ServerRead | undefined> {
    const res = await orpc.servers.read({ id })

    return !res ? undefined : res
  }

  async function update(payload: ServerUpdate): Promise<boolean> {
    const res = await orpc.servers.update(payload)

    if(!res) return false

    return res
  }

  async function create(payload: ServerCreateInput): Promise<boolean> {
    const res = await orpc.servers.create(payload)

    if(!res) return false

    return res
  }

  async function poweron(id: string): Promise<boolean> {
    return await orpc.servers.poweron({id})
  }

  async function poweroff(id: string): Promise<boolean> {
    return await orpc.servers.poweroff({id})
  }

  return {
    servers,
    list,
    read,
    update,
    create,
    poweron,
    poweroff,
  }
}, {
  persist: true
})