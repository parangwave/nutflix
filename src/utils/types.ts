export type Movie = {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  runtime: number;
  popularity: number;
};

export type MovieListProps = {
  movies: Movie[];
  onMovieClick: (id: string) => void;
};

export type MovieModalProps = {
  id: string;
  onClose: () => void;
};

export type HeaderProps = {
  toggleTheme: () => void;
};
