import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // This allows us to access VITE_API_KEY from Vercel environment variables
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    // Set base to './' so assets load correctly on both Vercel (root) and GitHub Pages (subdirectory)
    base: './',
    plugins: [react()],
    // Define global constants to replace variables like process.env.API_KEY with actual values during build
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || env.API_KEY || '')
    }
  }
})
