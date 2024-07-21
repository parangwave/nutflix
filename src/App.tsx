import { useState } from "react";
import { Outlet } from "react-router-dom";

// components
import MovieModal from "./components/MovieModal";
import Header from "./components/Header";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  return (
    <div>
      <Header toggleTheme={toggleTheme} />
      <Outlet context={[selectedMovie, setSelectedMovie]} />
      {selectedMovie && (
        <MovieModal id={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
