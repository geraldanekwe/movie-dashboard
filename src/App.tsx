import { useState } from "react";
import { fetchDiscoverMovies } from "./services/tmdb";

function App() {
  const [loading, setLoading] = useState(false);

  const handleFetchMovies = async () => {
    try {
      setLoading(true);

      const data = await fetchDiscoverMovies();

      console.log("TMDB Response:", data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <button
        onClick={handleFetchMovies}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? "Fetching movies..." : "Fetch Movies"}
      </button>
    </main>
  );
}

export default App;
