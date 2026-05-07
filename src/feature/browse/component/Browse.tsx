import { useEffect, useMemo } from "react";
import useDiscovery from "../../../core/store/useDiscovery";
import CategoryFilter from "./CategoryFilter";
import { catalogURL } from "../../../api/baseURL";
import { useNavigate } from "react-router";

export default function Browse() {
  const selectedID = useDiscovery((s) => s.selectedCategoryID);
  const setMovies = useDiscovery((s) => s.setMovies);
  const movies = useDiscovery((s) => s.movies);
  const navigate = useNavigate();
  async function getMovies(controller: AbortController) {
    try {
      const url =
        selectedID === "all"
          ? `${catalogURL}/movies`
          : `${catalogURL}/categories/${selectedID}/movies`;
      const response = await fetch(url, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const content = await response.json();
      setMovies(content.movies);
    } catch (error) {
      throw error;
    }
  }
  const renderMovies = useMemo(() => {
    return movies.map((m) => {
      return m.backdrop ? (
        <img
          className="rounded-lg border border-[#5b5b5b] hover:cursor-pointer"
          key={m.id}
          src={m.backdrop}
          alt=""
          onClick={() => navigate(`/m/${m.id}`)}
        />
      ) : (
        <div
          onClick={() => navigate(`/m/${m.id}`)}
          className="p-12 border-[#5b5b5b] border hover:cursor-pointer"
          key={m.id}
        >
          <img src="./no-image.png" alt="" />
        </div>
      );
    });
  }, [movies, navigate]);
  useEffect(() => {
    const controller = new AbortController();
    getMovies(controller);
    return () => {
      controller.abort();
    };
  }, [selectedID]);
  return (
    <div className="flex flex-col w-full text-white p-8 gap-4">
      <h1 className="text-3xl font-bold">DISCOVERY</h1>
      <CategoryFilter />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {renderMovies}
      </div>
    </div>
  );
}
