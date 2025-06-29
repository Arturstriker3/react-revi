import { MonsterBattle } from "../entities/MonsterBattle";

export interface IMonsterBattleRepository {
  create(
    battle: Omit<MonsterBattle, "id" | "created_at" | "updated_at">
  ): Promise<MonsterBattle>;
  findById(id: string): Promise<MonsterBattle | null>;
  findAll(): Promise<MonsterBattle[]>;
  findByMonsterId(monsterId: string): Promise<MonsterBattle[]>;
  update(id: string, battle: Partial<MonsterBattle>): Promise<MonsterBattle>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}
