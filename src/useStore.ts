import create from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  isAuthorized: () => boolean;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string | null) => set({ token }),
  clearToken: () => set({ token: null }),
  isAuthorized: () => !!localStorage.getItem("access_token"),
}));

export default useAuthStore;
