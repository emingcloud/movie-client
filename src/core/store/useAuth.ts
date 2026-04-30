import { create } from "zustand";

interface State {
  isLogged: boolean | null;
}
interface Acton {
  setIsLogged: (value: boolean) => void;
}

const useAuth = create<State & Acton>((set) => {
  return {
    isLogged: null,
    setIsLogged: (value) =>
      set({
        isLogged: value,
      }),
  };
});
export default useAuth;
