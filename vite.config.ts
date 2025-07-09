import { defineConfig, createLogger } from 'vite'
import deno from '@deno/vite-plugin'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

const logger = createLogger()
const loggerError = logger.error

logger.error = (msg, options) => {
    // Ignore proxy error
    // Can be removed if https://github.com/denoland/deno/issues/28850 is resolved
    if (msg.includes("http proxy error:") && msg.includes("ext:deno_fetch/23_request.js:613:7")) return
    loggerError(msg, options)
}

// https://vite.dev/config/
export default defineConfig({
  customLogger: logger,
  plugins: [deno(), vue(), tailwindcss()],
  server: {
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:4000',
      },
    },
  },
})
