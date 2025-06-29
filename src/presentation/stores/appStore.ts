import { create } from "zustand";
import { useMonsterStore } from "./monsterStore";

interface AppState {
  clearAppData: () => Promise<void>;
  isMobile: boolean;
}

export const useAppStore = create<AppState>((_set) => ({
  clearAppData: async () => {
    const monsterStore = useMonsterStore.getState();
    await monsterStore.resetStore();
  },
  isMobile: window.innerWidth <= 768,
}));
