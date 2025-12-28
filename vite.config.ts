import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts:
      process.env.NODE_ENV === "development"
        ? true
        : ["haughtily-above-fieldfare.cloudpub.ru"],
  },
});
