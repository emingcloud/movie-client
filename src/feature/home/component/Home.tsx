import { useEffect, useState } from "react";
import Highlight from "./Highlight";
import NewRelease from "./NewRelease";
import Suggestion from "./Suggestion";
import Trending from "./Trending";
import useScreenSize from "../../../shared/useScreenSize";

export default function Home() {
  const screen = useScreenSize();
  const [col, setCol] = useState(1);
  useEffect(() => {
    if (screen.width >= 640 && screen.width < 768) {
      setCol(3);
    } else if (screen.width >= 768) {
      setCol(4);
    } else {
      setCol(2);
    }
  }, [screen, setCol]);
  return (
    <div className="flex w-full flex-col bg-[#212121] items-center absolute top-0">
      <Highlight />
      <div className="p-8 flex flex-col gap-4 w-full">
        <Trending col={col} />
        <NewRelease col={col} />
        <Suggestion col={col} />
      </div>
    </div>
  );
}
