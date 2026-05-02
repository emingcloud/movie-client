import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="bg-[#262626] relative h-screen scroll-container select-none">
      <Outlet />
    </div>
  );
}

export default App;
