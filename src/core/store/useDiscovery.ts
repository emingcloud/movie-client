import { create } from "zustand";
import type { Rest } from "../../interface/Rest";

interface State {
  selectedCategoryID: string | null;
  movies: Rest.Movie[];
  categories: Rest.Category[];
  hasMore: boolean;
  offset: number;
  loading: boolean;
  error: string | null;
}
interface Action {
  setSelectedCategoryID: (id: string) => void;
  setMovies: (movies: Rest.Movie[]) => void;
  addMovies: (movies: Rest.Movie[]) => void;
  addCategories: (categories: Rest.Category[]) => void;
  setHasMore: (hasMore: boolean) => void;
  setOffset: (offset: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
const init: State = {
  selectedCategoryID: "all",
  movies: [],
  categories: [
    {
      id: "all",
      name: "All",
    },
  ],
  hasMore: true,
  offset: 0,
  loading: false,
  error: null,
};
const useDiscovery = create<State & Action>((set) => {
  return {
    ...init,
    setSelectedCategoryID: (id) => set({ selectedCategoryID: id }),
    setMovies: (movies) => set({ movies: movies }),
    addMovies: (movies) =>
      set((state) => ({ movies: [...state.movies, ...movies] })),
    addCategories: (categories) =>
      set((state) => ({ categories: [...state.categories, ...categories] })),
    setHasMore: (hasMore) => set({ hasMore: hasMore }),
    setOffset: (offset) => set({ offset: offset }),
    setLoading: (loading) => set({ loading: loading }),
    setError: (error) => set({ error: error }),
    reset: () =>
      set({
        ...init,
        movies: [],
        categories: [
          {
            id: "all",
            name: "All",
          },
        ],
      }),
  };
});

export default useDiscovery;
