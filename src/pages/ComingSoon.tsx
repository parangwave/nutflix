import { useState } from "react";
import { useQuery } from "react-query";

// api
import { getComingSoon } from "../utils/api";

// components
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";

export default function ComingSoon() {
  const { data, error, isLoading } = useQuery("comingSoon", getComingSoon);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div>
      <MovieList movies={data.results} onMovieClick={setSelectedMovie} />
      {selectedMovie && (
        <MovieModal id={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
