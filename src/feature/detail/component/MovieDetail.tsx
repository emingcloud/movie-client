import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { catalogURL } from "../../../api/baseURL";
import type { Rest } from "../../../interface/Rest";

const MovieDetail = () => {
  const [movie, setMovie] = useState<Rest.Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  async function getMovie() {
    try {
      const response = await fetch(`${catalogURL}/movies/${params.id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const content = await response.json();
      setMovie(content.movie);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getMovie();
  }, []);

  if (loading)
    return (
      <div className="bg-[#0a0f14] min-h-screen text-white p-10">
        Loading...
      </div>
    );
  return (
    <div className="relative min-h-screen bg-[#0a0f14] text-white font-sans overflow-hidden">
      {/* Backdrop Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30">
        <img
          className="object-cover w-full h-full"
          src={movie.backdrop}
          alt=""
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0f14] via-transparent to-[#0a0f14]" />
      </div>

      <main className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-center min-h-screen p-8 lg:p-24 gap-6">
        {/* Thumbnail Image */}
        <div className="w-64 lg:w-80 shrink-0 shadow-2xl rounded-xl overflow-hidden border border-white/10">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="max-w-3xl">
          <h1 className="text-5xl lg:text-8xl font-black mb-4 tracking-tighter uppercase leading-none">
            {movie.title}
          </h1>
          <div className="py-4">{new Date(movie.release).getFullYear()}</div>
          {/* Categories (Junction Table Data) */}
          <div className="flex flex-wrap gap-3 mb-10">
            {movie.categories.map((cat) => (
              <span
                key={cat.id}
                className="px-5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-semibold border border-white/5 uppercase tracking-wider"
              >
                {cat.name}
              </span>
            ))}
          </div>

          {/* Plot */}
          <div className="mb-12">
            <h3 className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-3 font-bold">
              Description
            </h3>
            <p className="text-xl leading-relaxed text-gray-300 max-w-xl italic">
              "{movie.plot}"
            </p>
          </div>
          <button
            onClick={() =>
              navigate(`/watch/${params.id}`, {
                state: {
                  video: movie.video,
                },
              })
            }
            className="flex hover:cursor-pointer items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black hover:scale-105 transition-transform"
          >
            {/* Play SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
              <path d="M8 5v14l11-7z" />
            </svg>
            WATCH NOW
          </button>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
