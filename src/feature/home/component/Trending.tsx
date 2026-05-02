import { useEffect } from "react";
import useTrending from "../../../core/store/useTrending";
import { catalogURL } from "../../../api/baseURL";
import MovieContainer from "./MovieContainer";

export default function Trending({ col }: { col: number }) {
  const movies = useTrending((state) => state.movies);
  const addMovies = useTrending((state) => state.addMovies);
  async function getMovies() {
    try {
      const response = await fetch(`${catalogURL}/movies`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const content = await response.json();
      addMovies(content.movies);
    } catch (error) {}
  }
  useEffect(() => {
    if (movies.length === 0) {
      getMovies();
    }
  }, []);
  return (
    <MovieContainer
      col={col}
      category={{
        id: "trending",
        name: "Trending",
        movies: movies,
      }}
    />
  );
}
