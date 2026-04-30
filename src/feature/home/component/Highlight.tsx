import { useState } from "react";

export default function Highlight() {
  const [movie, setMovie] = useState({
    title: "Howl's Moving Castle",
    plot: "Sophie, a young milliner, is turned into an elderly woman by a witch who enters her shop and curses her. She encounters a wizard named Howl and gets caught up in his resistance to fighting for the king.",
  });
  return (
    <div className="relative flex w-full aspect-video lg:h-[calc(1024px*9/16)] items-center">
      <img
        src="./backdrop.webp"
        className="w-full h-full object-cover absolute"
        alt=""
      />
      <div className="flex flex-col z-0 px-8 sm:w-[75%] md:w-[50%]">
        <h1 className="text-white text-3xl ">{movie.title}</h1>
        <p className="text-[#e4e4e4] ">{movie.plot}</p>
      </div>
    </div>
  );
}
