import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ==================== VITE CONFIG ====================
// Registers React and Tailwind plugins for the dev/build pipeline.
// =====================================================

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
