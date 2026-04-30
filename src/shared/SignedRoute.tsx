import { useEffect } from "react";
import useAuth from "../core/store/useAuth";
import { Outlet, useNavigate } from "react-router";
import { usersURL } from "../api/baseURL";

export default function SignedRoute() {
  const isLogged = useAuth((s) => s.isLogged);
  const setIsLogged = useAuth((s) => s.setIsLogged);
  const navigate = useNavigate();
  async function checkLogin() {
    try {
      const response = await fetch(`${usersURL}/current`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        return navigate("/login");
      }
      setIsLogged(true);
    } catch (err) {
      navigate("/error", {
        state: {
          error: "unable to connect to server",
        },
      });
    }
  }
  useEffect(() => {
    if (isLogged === false) {
      navigate("/login");
    }
  }, [isLogged]);
  useEffect(() => {
    if (isLogged === null) {
      checkLogin();
    }
  }, []);
  if (isLogged) {
    return <Outlet />;
  }
  return null;
}
