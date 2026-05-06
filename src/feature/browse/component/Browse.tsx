import { useEffect } from "react";
import useDiscovery from "../../../core/store/useDiscovery";
import CategoryFilter from "./CategoryFilter";
import { catalogURL } from "../../../api/baseURL";

export default function Browse() {
  const selectedID = useDiscovery((s) => s.selectedCategoryID);
  async function getMovies(controller: AbortController) {
    const response = await fetch(`${catalogURL}/movies`);
  }
  useEffect(() => {
    const controller = new AbortController();
    return () => {
      controller.abort();
    };
  }, [selectedID]);
  return (
    <div className="flex flex-col w-full text-white p-8 gap-4">
      <h1 className="text-3xl font-bold">DISCOVERY</h1>
      <CategoryFilter />
    </div>
  );
}
