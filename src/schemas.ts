import { z } from 'zod'

const macRegExp = /^[0-9a-fA-F]{1,2}(:[0-9a-fA-F]{1,2}){5}$/

export const ServerSchema = z.object({
  id: z.uuidv4(),
  name: z.string().min(3),
  mac: z.string().regex(macRegExp),
  ip: z.ipv4(),
  user: z.string().min(3),
  password: z.string().min(3),
})

export const ServersListSchema = z.array(
  z.object({
    id: z.uuidv4(),
    name: z.string().min(3),
    mac: z.string().regex(macRegExp),
    ip: z.ipv4(),
    online: z.boolean(),
  })
)

export const ServerReadSchema = z.object({
  id: z.uuidv4(),
  name: z.string().min(3),
  mac: z.string().regex(macRegExp),
  ip: z.ipv4(),
  user: z.string().min(3),
})

export const ServerCreateSchema = z.object({
  name: z.string().min(3),
  mac: z.string().regex(macRegExp),
  ip: z.ipv4(),
  user: z.string().min(3),
  password: z.string().min(3),
})

export const ServerCreateInputSchema = ServerCreateSchema

export const ServerUpdateInputSchema = z.object({
  name: z.string().min(3),
  mac: z.string().regex(macRegExp),
  ip: z.ipv4(),
  user: z.string().min(3),
  password: z.string().min(3).optional(),
})

export const ServerUpdateSchema = z.object({
  id: z.uuidv4(),
  name: z.string().min(3),
  mac: z.string().regex(macRegExp),
  ip: z.ipv4(),
  user: z.string().min(3),
  password: z.string().min(3).optional(),
})
