import { z } from 'zod/v4'
import { 
  ServerSchema,
  ServersListSchema,
  ServerCreateInputSchema,
  ServerUpdateInputSchema,
} from './schemas.ts'
import { router } from './server/api.ts'

export type Router = typeof router

export type Server = z.infer<typeof ServerSchema>
export type ServerList = z.infer<typeof ServersListSchema>
export type ServerCreateInput = z.infer<typeof ServerCreateInputSchema>
export type ServerUpdateInput = z.infer<typeof ServerUpdateInputSchema>
export type ServerUpdate = ServerUpdateInput & { id: string }
export type ServerRead = Omit<Server, 'password'>

export type AlertType = 'default' | 'success' | 'danger' | 'warning' | 'info'

export type Alert = {
  isVisible: boolean,
  type: AlertType,
  message: string,
}
