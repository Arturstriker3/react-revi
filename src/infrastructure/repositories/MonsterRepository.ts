import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { Monster } from "../../domain/entities/Monster";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "monsters";

function loadMonsters(): Monster[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data, (key, value) => {
        if (key === "created_at" || key === "updated_at")
          return new Date(value);
        return value;
      })
    : [];
}

function saveMonsters(monsters: Monster[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(monsters));
}

export class MonsterRepository implements IMonsterRepository {
  async findAll(): Promise<Monster[]> {
    return loadMonsters();
  }

  async findById(id: string): Promise<Monster | null> {
    const monsters = loadMonsters();
    return monsters.find((m) => m.id === id) || null;
  }

  async create(
    monster: Omit<Monster, "id" | "created_at" | "updated_at">
  ): Promise<Monster> {
    const newMonster: Monster = {
      ...monster,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };
    const monsters = loadMonsters();
    monsters.push(newMonster);
    saveMonsters(monsters);
    return newMonster;
  }

  async update(
    id: string,
    monster: Partial<Omit<Monster, "id" | "created_at" | "updated_at">>
  ): Promise<Monster> {
    const monsters = loadMonsters();
    const idx = monsters.findIndex((m) => m.id === id);

    if (idx === -1) {
      throw new Error("Monstro não encontrado");
    }

    monsters[idx] = {
      ...monsters[idx],
      ...monster,
      updated_at: new Date(),
    };
    saveMonsters(monsters);
    return monsters[idx];
  }

  async delete(id: string): Promise<void> {
    let monsters = loadMonsters();
    const initialLength = monsters.length;
    monsters = monsters.filter((m) => m.id !== id);

    if (monsters.length === initialLength) {
      throw new Error("Monstro não encontrado");
    }

    saveMonsters(monsters);
  }

  async clear(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  }
}
