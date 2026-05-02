import { create } from "zustand";
import type { Rest } from "../../interface/Rest";

interface State {
  movie: Rest.Movie;
}
interface Action {
  setMovie: (movie: Rest.Movie) => void;
}

const useHighlight = create<State & Action>((set) => {
  return {
    movie: null,
    setMovie: (movie) => set({ movie: movie }),
  };
});
export default useHighlight;
