import { create } from "zustand";
import { Monster } from "../../domain/entities/Monster";
import { MonsterRepository } from "../../infrastructure/repositories/MonsterRepository";

interface MonsterStore {
  monsters: Monster[];
  loading: boolean;
  error: string | null;
  fetchMonsters: () => Promise<void>;
  createMonster: (
    monster: Omit<Monster, "id" | "created_at" | "updated_at">
  ) => Promise<void>;
  updateMonster: (id: string, monster: Partial<Monster>) => Promise<void>;
  deleteMonster: (id: string) => Promise<void>;
  resetStore: () => Promise<void>;
}

const repository = new MonsterRepository();

export const useMonsterStore = create<MonsterStore>((set) => ({
  monsters: [],
  loading: false,
  error: null,

  fetchMonsters: async () => {
    set({ loading: true, error: null });
    try {
      const monsters = await repository.findAll();
      set({ monsters, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  createMonster: async (monster) => {
    set({ loading: true, error: null });
    try {
      await repository.create(monster);
      const monsters = await repository.findAll();
      set({ monsters, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateMonster: async (id, monster) => {
    set({ loading: true, error: null });
    try {
      await repository.update(id, monster);
      const monsters = await repository.findAll();
      set({ monsters, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteMonster: async (id) => {
    set({ loading: true, error: null });
    try {
      await repository.delete(id);
      const monsters = await repository.findAll();
      set({ monsters, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  resetStore: async () => {
    await repository.clear();
    set({ monsters: [], loading: false, error: null });
  },
}));
