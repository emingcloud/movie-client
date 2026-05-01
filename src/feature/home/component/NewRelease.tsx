import { useEffect } from "react";
import useNewRelease from "../../../core/store/useNewRelease";
import { catalogURL } from "../../../api/baseURL";

export default function NewRelease() {
  const movies = useNewRelease((state) => state.movies);
  const addMovies = useNewRelease((state) => state.addMovies);
  async function getMovies() {
    try {
      const response = await fetch(`${catalogURL}/movies?sortBy=release`, {
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
  return <div></div>;
}
