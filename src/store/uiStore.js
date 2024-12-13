import { create } from "zustand";

export const useUIStore = create((set) => ({
  sidebarCollapsed: window.innerWidth <= 768, // Tertutup secara default di layar kecil
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set(() => ({ sidebarCollapsed: collapsed })),
}));