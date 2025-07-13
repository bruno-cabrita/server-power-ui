import app from './server.ts'

console.log(`Server is running on http://localhost:4000`)

Deno.serve({ port: 4000 }, app.fetch)