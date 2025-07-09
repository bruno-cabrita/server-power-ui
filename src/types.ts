import { z } from 'zod/v4'
import { ServerSchema, ServerCreateInputSchema } from './schemas.ts'

export type Server = z.infer<typeof ServerSchema>
export type ServerList = (Omit<Server, 'user' | 'password'> & { online: boolean })[]
export type ServerCreateInput = z.infer<typeof ServerCreateInputSchema>
export type ServerUpdateInput = Server & { password?: string }
export type ServerRead = Omit<Server, 'password'>

export type AlertType = 'default' | 'success' | 'danger' | 'warning' | 'info'

export type Alert = {
  isVisible: boolean,
  type: AlertType,
  message: string,
}
