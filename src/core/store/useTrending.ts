import { create } from "zustand";
import type { Rest } from "../../interface/Rest";

interface State {
  movies: Rest.Movie[];
}
interface Action {
  addMovies: (movies: Rest.Movie[]) => void;
  reset: () => void;
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
    reset: () => set({ movies: [] }),
  };
});
export default useTrending;
