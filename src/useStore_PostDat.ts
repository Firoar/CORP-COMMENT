// useStore_PostData.ts
import create from "zustand";

interface PostDataState {
  postData: any[]; // Replace `any` with your actual data type
  setPostData: (data: any[]) => void; // Replace `any` with your actual data type
}

export const usePostDataStore = create<PostDataState>((set) => ({
  postData: [],
  setPostData: (data) => set({ postData: data }),
}));

// export default usePostDataStore;

interface MyStoreState {
  changedPost: boolean;
  changedLike: boolean;
  setChangedPost: (value: boolean) => void;
  setChangedLike: (value: boolean) => void;
}

export const useMyStore = create<MyStoreState>((set) => ({
  changedPost: false,
  changedLike: false,
  setChangedPost: (value: boolean) => set({ changedPost: value }),
  setChangedLike: (value: boolean) => set({ changedLike: value }),
}));

/*
const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token: string | null) => set({ token }),
  clearToken: () => set({ token: null }),
  isAuthorized: () => !!localStorage.getItem("access_token"),
}));

export default useAuthStore;

*/
