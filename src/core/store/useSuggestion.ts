import { create } from "zustand";
import type { Rest } from "../../interface/Rest";

interface State {
  categories: Rest.Category[];
}
interface Action {
  addCategories: (movies: Rest.Category[]) => void;
  reset: () => void;
}
const useSuggestion = create<State & Action>((set) => {
  return {
    categories: [],
    addCategories: (categories) =>
      set((state) => {
        return {
          categories: [...state.categories, ...categories],
        };
      }),
    reset: () =>
      set({
        categories: [],
      }),
  };
});
export default useSuggestion;
