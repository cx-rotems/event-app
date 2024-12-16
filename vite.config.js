/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const API_BASE = process.env.VITE_API_BASE_URL || 'http://52.215.31.82:8080';
const HOST_URL= process.env.VITE_HOST_URL  || 'localhost';
const HOST_PORT = process.env.VITE_HOST_PORT || 5173;

console.log("VITE_API_BASE_URL");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: HOST_URL, // Specify the host
    port: HOST_PORT, // Specify the port
    proxy: {
        '/api': {
            target: API_BASE, 
            changeOrigin: true,
            secure: false,
        },
    },
},
})
