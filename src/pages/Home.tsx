import React from "react";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";

// api
import { getPopular } from "../utils/api";

// components
import MovieList from "../components/MovieList";

export default function Home() {
  const { data, error, isLoading } = useQuery("popular", getPopular);
  const [selectedMovie, setSelectedMovie] =
    useOutletContext<
      [string | null, React.Dispatch<React.SetStateAction<string | null>>]
    >();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div>
      {/* popular movies */}
      <MovieList movies={data.results} onMovieClick={setSelectedMovie} />
    </div>
  );
}
