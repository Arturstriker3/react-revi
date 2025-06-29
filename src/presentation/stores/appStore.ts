import { create } from "zustand";
import { useMonsterStore } from "./monsterStore";

interface AppState {
  clearAppData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  clearAppData: async () => {
    const monsterStore = useMonsterStore.getState();
    await monsterStore.resetStore();
  },
}));
