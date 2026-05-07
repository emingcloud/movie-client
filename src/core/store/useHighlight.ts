import { create } from "zustand";
import type { Rest } from "../../interface/Rest";

interface State {
  movie: Rest.Movie;
}
interface Action {
  setMovie: (movie: Rest.Movie) => void;
  reset: () => void;
}
const init: State = {
  movie: null,
};
const useHighlight = create<State & Action>((set) => {
  return {
    ...init,
    setMovie: (movie) => set({ movie: movie }),
    reset: () =>
      set({
        movie: null,
      }),
  };
});
export default useHighlight;
