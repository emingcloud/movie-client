import { useEffect, useState } from "react";
import useHighlight from "../../../core/store/useHighlight";
import { catalogURL } from "../../../api/baseURL";

export default function Highlight() {
  const movie = useHighlight((s) => s.movie);
  const setMovie = useHighlight((s) => s.setMovie);
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
    <div className="relative flex w-full aspect-video lg:h-[calc(1024px*9/16)] items-center">
      {movie?.backdrop ? (
        <img
          src={movie.backdrop}
          className="w-full h-full object-cover absolute"
          alt=""
        />
      ) : (
        <div className="w-full flex items-center justify-center h-full object-cover absolute">
          <img className="w-48 h-48" src="./no-image.png" alt="" />
        </div>
      )}

      <div className="flex flex-col z-0 px-8 sm:w-[75%] md:w-[50%]">
        {movie ? (
          <>
            <h1 className="text-white text-3xl ">{movie.title}</h1>
            <p className="text-[#e4e4e4] ">{movie.plot}</p>
          </>
        ) : (
          <div className="text-white">loading...</div>
        )}
      </div>
    </div>
  );
}
