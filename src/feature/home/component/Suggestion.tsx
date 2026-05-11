import { useEffect, useMemo } from "react";
import { catalogURL } from "../../../api/baseURL";
import useSuggestion from "../../../core/store/useSuggestion";
import MovieContainer from "./MovieContainer";

export default function Suggestion({ col }: { col: number }) {
  const categories = useSuggestion((state) => state.categories);

  const addMovies = useSuggestion((state) => state.addCategories);
  const renderSuggestion = useMemo(() => {
    return categories.map((category) => {
      return <MovieContainer key={category.id} category={category} col={col} />;
    });
  }, [categories, col]);
  async function getCategories() {
    try {
      const response = await fetch(`${catalogURL}/suggestion`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const content = await response.json();
      addMovies(content.categories);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);
  return (
    <div className="flex flex-col w-full text-primary gap-4">
      {renderSuggestion}
    </div>
  );
}
