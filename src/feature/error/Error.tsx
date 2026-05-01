import { useLocation } from "react-router";

export default function Error() {
  const location = useLocation();
  return (
    <div className="w-full h-full bg-white p-2 text-red-500">
      {location.state.error}
    </div>
  );
}
