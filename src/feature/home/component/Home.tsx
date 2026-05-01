import Highlight from "./Highlight";
import NewRelease from "./NewRelease";
import Trending from "./Trending";

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center absolute top-0">
      <Highlight />
      <Trending />
      <NewRelease />
    </div>
  );
}
