import { RouterClient } from '@orpc/server'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { Router } from '../types.ts'

const link = new RPCLink({ url: () => new URL('/api', globalThis.location.href) })

export const orpc: RouterClient<Router> = createORPCClient(link)