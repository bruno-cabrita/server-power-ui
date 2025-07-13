import { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { Router } from '../types.ts'

const link = new RPCLink({ url: 'http://localhost:4000/api' })

export const orpc: RouterClient<Router> = createORPCClient(link)