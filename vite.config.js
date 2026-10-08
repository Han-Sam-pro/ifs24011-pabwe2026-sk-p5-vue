import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Muat variabel environment berdasarkan mode (development/production)
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      tailwindcss(), // Plugin Tailwind CSS v4
    ],
    server: {
      // Mengatur port lokal dari variabel APP_PORT, default ke 5173 jika tidak ada
      port: parseInt(env.APP_PORT || '5173'),
    },
    define: {
      // Define konstanta DELCOM_BASEURL (secara global)
      'DELCOM_BASEURL': JSON.stringify('https://open-api.delcom.org/api/v1')
    },
    test: {
      environment: 'jsdom',
      globals: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        // Threshold coverage v8 100%
        thresholds: {
          lines: 100,
          functions: 100,
          branches: 100,
          statements: 100
        }
      }
    }
  }
})