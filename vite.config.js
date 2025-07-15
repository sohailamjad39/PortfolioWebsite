import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network interfaces (0.0.0.0)
    port: 5173, // Optional: use this if you want to keep the default Vite port
  },
});
