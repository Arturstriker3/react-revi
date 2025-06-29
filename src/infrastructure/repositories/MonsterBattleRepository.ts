import { MonsterBattle } from "../../domain/entities/MonsterBattle";
import { IMonsterBattleRepository } from "../../domain/repositories/IMonsterBattleRepository";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "monster_battles";

function loadBattles(): MonsterBattle[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data, (key, value) => {
        if (key === "created_at" || key === "updated_at")
          return new Date(value);
        return value;
      })
    : [];
}

function saveBattles(battles: MonsterBattle[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(battles));
}

export class MonsterBattleRepository implements IMonsterBattleRepository {
  async create(
    battle: Omit<MonsterBattle, "id" | "created_at" | "updated_at">
  ): Promise<MonsterBattle> {
    const newBattle: MonsterBattle = {
      ...battle,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const battles = loadBattles();
    battles.push(newBattle);
    saveBattles(battles);
    return newBattle;
  }

  async findById(id: string): Promise<MonsterBattle | null> {
    const battles = loadBattles();
    return battles.find((b) => b.id === id) || null;
  }

  async findAll(): Promise<MonsterBattle[]> {
    return loadBattles();
  }

  async findByMonsterId(monsterId: string): Promise<MonsterBattle[]> {
    const battles = loadBattles();
    return battles.filter(
      (battle) =>
        battle.monster1Id === monsterId || battle.monster2Id === monsterId
    );
  }

  async update(
    id: string,
    battleData: Partial<Omit<MonsterBattle, "id" | "created_at" | "updated_at">>
  ): Promise<MonsterBattle> {
    const battles = loadBattles();
    const battleIndex = battles.findIndex((b) => b.id === id);

    if (battleIndex === -1) {
      throw new Error("Batalha não encontrada");
    }

    battles[battleIndex] = {
      ...battles[battleIndex],
      ...battleData,
      updated_at: new Date(),
    };

    saveBattles(battles);
    return battles[battleIndex];
  }

  async delete(id: string): Promise<void> {
    let battles = loadBattles();
    const initialLength = battles.length;
    battles = battles.filter((b) => b.id !== id);

    if (battles.length === initialLength) {
      throw new Error("Batalha não encontrada");
    }

    saveBattles(battles);
  }
}
