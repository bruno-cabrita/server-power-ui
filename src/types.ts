import { z } from 'zod'
import { ServerSchema } from './schemas.ts'

export type Server = z.infer<typeof ServerSchema>
export type ServerList = (Omit<Server, 'user' | 'password'> & { online: boolean })[]
export type ServerCreate = Omit<Server, 'id'>
export type ServerUpdate = Server & { password?: string }
export type ServerRead = Omit<Server, 'password'>

export type AlertType = 'default' | 'success' | 'danger' | 'warning' | 'info'

export type Alert = {
  isVisible: boolean,
  type: AlertType,
  message: string,
}
