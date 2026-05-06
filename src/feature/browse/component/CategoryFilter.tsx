import { useEffect, useMemo, useRef } from "react";
import useDiscovery from "../../../core/store/useDiscovery";
import { catalogURL } from "../../../api/baseURL";

export default function CategoryFilter() {
  const categories = useDiscovery((s) => s.categories);
  const addCategories = useDiscovery((s) => s.addCategories);
  const selectedID = useDiscovery((s) => s.selectedCategoryID);
  const setID = useDiscovery((s) => s.setSelectedCategoryID);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleWheel = (e) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    }
  };
  const renderCategories = useMemo(() => {
    return categories.map((category) => {
      return (
        <div
          onClick={() => setID(category.id)}
          className={`p-4 transition-colors duration-300 text-nowrap hover:cursor-pointer ${selectedID === category.id ? "bg-primary" : "bg-[#000000]"}  rounded-lg`}
          key={category.id}
        >
          {category.name}
        </div>
      );
    });
  }, [categories, selectedID]);
  async function getCategories() {
    try {
      const response = await fetch(`${catalogURL}/categories`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const content = await response.json();
      addCategories(content.categories);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (categories.length === 1) {
      getCategories();
    }
  }, []);
  return (
    <div
      ref={ref}
      onWheel={handleWheel}
      className="flex gap-2 overflow-scroll scroll-container"
    >
      {renderCategories}
    </div>
  );
}
