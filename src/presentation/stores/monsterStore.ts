import { create } from "zustand";
import { Monster } from "../../domain/entities/Monster";
import { MonsterRepository } from "../../infrastructure/repositories/MonsterRepository";

interface MonsterStore {
  monsters: Monster[];
  loading: boolean;
  error: string | null;
  fetchMonsters: () => Promise<void>;
  getMonster: (id: string) => Monster | undefined;
  createMonster: (
    monster: Omit<Monster, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateMonster: (
    id: string,
    monster: Partial<Omit<Monster, "id" | "created_at" | "updated_at">>
  ) => Promise<void>;
  deleteMonster: (id: string) => Promise<void>;
}

const repository = new MonsterRepository();

export const useMonsterStore = create<MonsterStore>((set, get) => ({
  monsters: [],
  loading: false,
  error: null,
  fetchMonsters: async () => {
    set({ loading: true, error: null });
    try {
      const monsters = await repository.getAll();
      set({ monsters });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  getMonster: (id: string) => {
    return get().monsters.find((m) => m.id === id);
  },
  createMonster: async (monster) => {
    set({ loading: true, error: null });
    try {
      await repository.create(monster);
      await get().fetchMonsters();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  updateMonster: async (id, monster) => {
    set({ loading: true, error: null });
    try {
      await repository.update(id, monster);
      await get().fetchMonsters();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  deleteMonster: async (id) => {
    set({ loading: true, error: null });
    try {
      await repository.delete(id);
      await get().fetchMonsters();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
