import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: false
      }
    })
  ],
  define: {
    'process.env': {},
    'process.version': '""',
    'global': {}
  },
  resolve: {
    alias: {
      jsbi: path.resolve(__dirname, "./node_modules/jsbi"),
    },
  },
})
