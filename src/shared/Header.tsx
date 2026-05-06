import { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

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
  const location = useLocation();
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
  return (
    <>
      <div
        className={`flex justify-between items-center py-4 px-8 z-10 ${location.pathname === "/" && "absolute"} bg-[#0000008d] text-[#cccccc] w-full`}
      >
        <h1 className="text-4xl text-primary">STREAMCORE</h1>
        <div className="flex items-center gap-8 text-2xl select-none">
          {renderMenu}
          <img
            src="./search.png"
            className="w-6 h-6 hover:cursor-pointer"
            alt=""
          />
        </div>
        <div className="flex gap-4 items-center hover:cursor-pointer select-none">
          <img src="./profile.png" className="w-12 h-12" alt="" />
          <img src="./down.png" className="w-6 h-6" alt="" />
        </div>
      </div>
      <Outlet />
    </>
  );
}
