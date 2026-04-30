import { useState } from "react";
import { usersURL } from "../../../api/baseURL";
import useAuth from "../../../core/store/useAuth";
import { useNavigate } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const setIsLogged = useAuth((s) => s.setIsLogged);
  const navigate = useNavigate();
  async function login() {
    try {
      const response = await fetch(`${usersURL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        const content = await response.json();
        throw new Error(content.error);
      }
      setIsLogged(true);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="h-screen w-full relative flex items-center justify-center font-sans">
      {/* Background Image */}
      <img
        src="./background-login.webp"
        className="absolute w-full h-full object-cover"
        alt="anime landscape background"
      />

      {/* Netflix-style Gradient Overlay: Darker edges to focus the eye */}
      <div className="absolute bg-[#00000043] w-full h-full"></div>
      <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, black 100%)"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-112.5 bg-black/75 rounded-md shadow-2xl p-12 mx-4 border border-white/10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Sign In</h1>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              className="w-full px-5 py-4 bg-[#333] text-white rounded-md outline-none border-b-2 border-transparent 
                         focus:border-primary focus:bg-[#454545] transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full px-5 py-4 bg-[#333] text-white rounded-md outline-none border-b-2 border-transparent 
                         focus:border-primary focus:bg-[#454545] transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={login}
            className="w-full bg-primary hover:cursor-pointer text-white font-bold py-3 rounded-md 
                   transition-all mt-4 text-lg active:scale-[0.99]"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-between items-center text-gray-400 text-xs mt-2">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-1 accent-gray-500" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-gray-500 text-base">
            New to the app?
            <a href="#" className="text-white hover:underline ml-1">
              Sign up now.
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-4 leading-tight">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <span className="text-primary hover:underline cursor-pointer ml-1">
              Learn more.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
