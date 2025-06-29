import { create } from "zustand";
import {
  MonsterBattle,
  BattleResult,
} from "../../domain/entities/MonsterBattle";
import { MonsterBattleRepository } from "../../infrastructure/repositories/MonsterBattleRepository";
import { CalculateBattleUseCase } from "../../application/use-cases/calculateBattle";
import { CreateBattleUseCase } from "../../application/use-cases/createBattle";
import { MonsterRepository } from "../../infrastructure/repositories/MonsterRepository";

interface BattleStore {
  battles: MonsterBattle[];
  currentBattle: BattleResult | null;
  loading: boolean;
  error: string | null;
  fetchBattles: () => Promise<void>;
  getBattle: (id: string) => MonsterBattle | undefined;
  calculateBattle: (
    monster1Id: string,
    monster2Id: string
  ) => Promise<BattleResult>;
  createBattle: (monster1Id: string, monster2Id: string) => Promise<void>;
  deleteBattle: (id: string) => Promise<void>;
}

const repository = new MonsterBattleRepository();
const monsterRepository = new MonsterRepository();
const calculateBattleUseCase = new CalculateBattleUseCase();
const createBattleUseCase = new CreateBattleUseCase(
  monsterRepository,
  repository
);

export const useBattleStore = create<BattleStore>((set, get) => ({
  battles: [],
  currentBattle: null,
  loading: false,
  error: null,

  fetchBattles: async () => {
    set({ loading: true, error: null });
    try {
      const battles = await repository.findAll();
      set({ battles });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getBattle: (id: string) => {
    return get().battles.find((b) => b.id === id);
  },

  calculateBattle: async (monster1Id: string, monster2Id: string) => {
    set({ loading: true, error: null });
    try {
      const monster1 = await monsterRepository.findById(monster1Id);
      const monster2 = await monsterRepository.findById(monster2Id);

      if (!monster1 || !monster2) {
        throw new Error("Um ou mais monstros não foram encontrados");
      }

      const battleResult = calculateBattleUseCase.execute(monster1, monster2);
      set({ currentBattle: battleResult });
      return battleResult;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  createBattle: async (monster1Id: string, monster2Id: string) => {
    set({ loading: true, error: null });
    try {
      await createBattleUseCase.execute(monster1Id, monster2Id);
      await get().fetchBattles();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteBattle: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await repository.delete(id);
      await get().fetchBattles();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
