import styled from "styled-components";
import { motion } from "framer-motion";

// api
import { makeImagePath } from "../utils/api";

// types
import { MovieListProps } from "../utils/types";

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const Movie = styled(motion.div)`
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

export default function MovieList({ movies, onMovieClick }: MovieListProps) {
  return (
    <List>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          whileHover={{ scale: 1.1 }}
          onClick={() => onMovieClick(movie.id)}
        >
          <img src={makeImagePath(movie.poster_path)} alt={movie.title} />
        </Movie>
      ))}
    </List>
  );
}
