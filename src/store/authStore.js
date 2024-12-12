import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('accessToken') || null, // tidak perlu JSON.parse
    refreshToken: localStorage.getItem('refreshToken') || null, // tidak perlu JSON.parse
    setAuth: (user, accessToken, refreshToken) => set({ user, accessToken, refreshToken }),
    clearAuth: () => set({ user: null, accessToken: null, refreshToken: null })
}));
 