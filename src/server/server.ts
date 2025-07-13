import { readTextFile } from 'fs/unstable-read-text-file'
import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
// import { secureHeaders } from 'hono/secure-headers'
import api from './api.ts'

const distPath = './dist'
const rootDistPath = `${import.meta.dirname}/../${distPath}`

const app = new Hono()

// app.use(secureHeaders())

app.route('/api', api)

app.get('*', serveStatic({ root: `${distPath}/`, precompressed: true }))

// fallsback to vite
app.get('*', async (c) => c.html(await readTextFile(`${rootDistPath}/index.html`)))

export default app
