import { create } from "zustand";
import type { Rest } from "../../interface/Rest";

interface State {
  movies: Rest.Movie[];
}
interface Action {
  addMovies: (movies: Rest.Movie[]) => void;
}
const useTrending = create<State & Action>((set) => {
  return {
    movies: [],
    addMovies: (movies) =>
      set((state) => {
        return {
          movies: [...state.movies, ...movies],
        };
      }),
  };
});
export default useTrending;
