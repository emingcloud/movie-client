import { useEffect } from "react";
import useHighlight from "../../../core/store/useHighlight";
import { catalogURL } from "../../../api/baseURL";
import { useNavigate } from "react-router";

export default function Highlight() {
  const movie = useHighlight((s) => s.movie);
  const setMovie = useHighlight((s) => s.setMovie);
  const navigate = useNavigate();
  async function getHighlight() {
    try {
      const response = await fetch(`${catalogURL}/highlight`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const content = await response.json();
      setMovie(content.movie);
    } catch (error) {}
  }
  useEffect(() => {
    if (!movie) {
      getHighlight();
    }
  }, []);
  return (
    <div className="relative flex w-full aspect-video lg:h-[calc(1024px*9/16)] items-center overflow-hidden bg-black">
      {/* Backdrop Image with Overlay */}
      <div className="absolute inset-0">
        {movie?.backdrop ? (
          <>
            <img
              src={movie.backdrop}
              className="w-full h-full object-cover"
              alt={movie.title || "Movie backdrop"}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-900">
            <img
              className="w-32 h-32 opacity-20"
              src="./no-image.png"
              alt="No backdrop available"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="relative z-10 px-8 md:px-16 w-full sm:w-[85%] md:w-[60%] lg:w-[45%] space-y-4">
        {movie ? (
          <>
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md">
              {movie.title}
            </h1>
            <p className="text-gray-200 text-sm md:text-lg line-clamp-2 md:line-clamp-3 leading-relaxed drop-shadow-sm">
              {movie.plot}
            </p>

            {/* Action Buttons Placeholder */}
            <div className="flex gap-4 pt-2">
              <button className="bg-white hover:cursor-pointer text-black px-6 py-2 rounded font-semibold hover:bg-white/90 transition">
                Play
              </button>
              <button
                onClick={() => navigate(`/m/${movie.id}`)}
                className="bg-gray-500/50 hover:cursor-pointer text-white px-6 py-2 rounded font-semibold backdrop-blur-md hover:bg-gray-500/70 transition"
              >
                More Info
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            <span className="text-white font-medium">Loading details...</span>
          </div>
        )}
      </div>
    </div>
  );
}
