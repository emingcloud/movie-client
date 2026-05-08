import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import type { Rest } from "../interface/Rest";
import { catalogURL } from "../api/baseURL";
import useAuth from "../core/store/useAuth";
import useDiscovery from "../core/store/useDiscovery";
import useHighlight from "../core/store/useHighlight";
import useNewRelease from "../core/store/useNewRelease";
import useSuggestion from "../core/store/useSuggestion";
import useTrending from "../core/store/useTrending";
interface Menu {
  name: string;
  dest: string;
}
const menus: Menu[] = [
  {
    name: "Home",
    dest: "/",
  },
  {
    name: "Browse",
    dest: "/browse",
  },
];
export default function Header() {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [openProfile, setOpenProfile] = useState(false);
  const setIsLogged = useAuth((s) => s.setIsLogged);
  const [openSearch, setOpenSearch] = useState(false);
  const resetDiscovery = useDiscovery((s) => s.reset);
  const resetHighlight = useHighlight((s) => s.reset);
  const resetNewRelease = useNewRelease((s) => s.reset);
  const resetSuggestion = useSuggestion((s) => s.reset);
  const resetTrending = useTrending((s) => s.reset);
  const [searchResult, setSearchResult] = useState<Rest.Movie[]>([]);
  const [search, setSearch] = useState("");
  const renderMenu = useMemo(() => {
    return menus.map((m) => {
      return (
        <div
          key={m.dest}
          onClick={() => navigate(m.dest)}
          className={`hover:cursor-pointer ${location.pathname === m.dest && "text-primary"} transition-colors duration-300`}
        >
          {m.name}
        </div>
      );
    });
  }, [navigate, location]);
  const searchMovies = useCallback(async (name: string) => {
    try {
      const response = await fetch(`${catalogURL}/movies?name=${name}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const content = await response.json();
      setSearchResult(content.movies);
    } catch (error) {
      throw error;
    }
  }, []);
  const renderSearch = useMemo(() => {
    return searchResult.map((m) => {
      return (
        <div
          onClick={() => navigate(`/m/${m.id}`)}
          className="hover:cursor-pointer"
          key={m.id}
        >
          {m.title}
        </div>
      );
    });
  }, [searchResult]);
  useEffect(() => {
    if (openSearch) {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setOpenSearch(false);
          setSearch("");
          setSearchResult([]);
        } else {
          setOpenSearch(true);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openSearch]);
  useEffect(() => {
    if (openProfile) {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setOpenProfile(false);
        } else {
          setOpenProfile(true);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openProfile]);
  useEffect(() => {
    if (search.trim() !== "") {
      const clear = setTimeout(async () => {
        searchMovies(search);
      }, 300);
      return () => {
        clearTimeout(clear);
      };
    }
  }, [search]);
  return (
    <>
      <div
        className={`flex  gap-2 justify-between items-center py-4 px-8 z-10 ${location.pathname === "/" && "absolute"} bg-[#0000008d] text-[#cccccc] w-full`}
      >
        <h1 className="text-4xl text-primary flex-1">STREAMCORE</h1>
        <div className="flex gap-8 text-2xl flex-1">
          {renderMenu}
          <div ref={searchRef} className="relative flex-1 flex items-center">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`absolute px-2 text-white focus:outline-none  focus:ring-0 inset-0 bg-primary rounded-lg origin-left transition-transform duration-300 ${
                openSearch ? "scale-x-100" : "scale-x-0"
              }`}
              type="text"
            />
            <img
              onClick={() => setOpenSearch(true)}
              src="./search.png"
              className={`w-6 h-6 absolute top-1/2 -translate-y-1/2 ${openSearch && "translate-x-[-150%]"} transition-all duration-300 hover:cursor-pointer ${
                openSearch ? "left-[calc(100%)]" : "left-0"
              }`}
            />
            {searchResult.length > 0 && (
              <div className="absolute p-2 overflow-y-scroll scroll-container rounded-lg h-48 w-full bg-[#161616] bottom-0 translate-y-[calc(100%+4px)]">
                {renderSearch}
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => setOpenProfile(true)}
          ref={profileRef}
          className="flex gap-4 relative items-center hover:cursor-pointer select-none"
        >
          <img src="./profile.png" className="w-12 h-12" alt="" />
          <img src="./down.png" className="w-6 h-6" alt="" />
          {openProfile && (
            <div className="absolute p-4 bottom-0 bg-[#292929] translate-y-full">
              <div
                onClick={() => {
                  resetDiscovery();
                  resetHighlight();
                  resetNewRelease();
                  resetSuggestion();
                  resetTrending();
                  setIsLogged(false);
                }}
              >
                logout
              </div>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
