import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // Proxy requests to the TMDB API through our own /api/tmdb endpoint.
      proxy: {
        "/api/tmdb": {
          target: "https://api.themoviedb.org",
          changeOrigin: true,
          rewrite: (path: string) => {
            const url = new URL(path, "http://localhost");
            const tmdbPath = url.searchParams.get("path");

            url.searchParams.delete("path");
            url.searchParams.set("api_key", env.TMDB_API_KEY ?? "");

            return `/3/${tmdbPath}?${url.searchParams}`;
          },
        },
      },
    },
  };
});
