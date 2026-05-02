import { useEffect, useRef, useState } from "react";
import type { Rest } from "../../../interface/Rest";
import { useNavigate } from "react-router";

export default function MovieContainer({
  category,
  col,
}: {
  category: Rest.Category;
  col: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const total =
    category.movies.length % col === 0
      ? category.movies.length / col
      : Math.floor(category.movies.length / col) + 1;
  function renderPagination() {
    return Array(total)
      .fill(0)
      .map((v, idx) => {
        return (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === offset ? "bg-primary" : "bg-[#484848]"}`}
          ></div>
        );
      });
  }

  useEffect(() => {
    if (offset > total - 1 && total > 0) {
      setOffset(total - 1);
    }
  }, [col]);
  function previous() {
    if (offset > 0) {
      setOffset((prev) => prev - 1);
    }
  }
  function next() {
    if (offset < total - 1) {
      setOffset((prev) => prev + 1);
    }
  }
  return (
    <div
      className="flex flex-col relative w-full text-primary"
      key={category.id}
    >
      <div
        onClick={previous}
        className="absolute z-10 hover:cursor-pointer translate-x-[-50%] top-[50%] left-0 bg-[#0000008e] rounded-full p-2"
      >
        <img className="w-6 h-6" src="./left-arrow.png" alt="" />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{category.name}</h1>
        <div className="flex gap-2">{renderPagination()}</div>
      </div>
      <div ref={containerRef} className="flex overflow-hidden rounded-lg">
        <div
          style={{
            translate: `calc(-${100 * offset}%)`,
          }}
          ref={ref}
          className={`w-full flex gap-2 transition-transform duration-300`}
        >
          {category.movies!.map((m) => {
            return m.backdrop ? (
              <img
                onClick={() => navigate(`/m/${m.id}`)}
                style={{
                  width: `calc(${100 / col}% - (8px * ${col - 1})/${col})`,
                }}
                className="aspect-video hover:cursor-pointer rounded-lg border-[#6e6e6e] border"
                alt=""
                src={m.backdrop}
                key={m.id}
              />
            ) : (
              <div
                onClick={() => navigate(`/m/${m.id}`)}
                key={m.id}
                style={{
                  width: `calc(${100 / col}% - (8px * ${col - 1})/${col})`,
                }}
                className="aspect-video flex justify-center items-center hover:cursor-pointer rounded-lg border-[#6e6e6e] border"
              >
                <img className="w-12 h-12" src="./no-image.png" alt="" />
              </div>
            );
          })}
        </div>
      </div>

      <div
        onClick={next}
        className="absolute z-10 hover:cursor-pointer translate-x-[50%] top-[50%] right-0 bg-[#0000008e] rounded-full p-2"
      >
        <img className="w-6 h-6" src="./right-arrow.png" alt="" />
      </div>
    </div>
  );
}
