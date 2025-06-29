import { Monster } from "../entities/Monster";

export interface IMonsterRepository {
  findAll(): Promise<Monster[]>;
  findById(id: string): Promise<Monster | null>;
  create(
    monster: Omit<Monster, "id" | "created_at" | "updated_at">
  ): Promise<Monster>;
  update(
    id: string,
    monster: Partial<Omit<Monster, "id" | "created_at" | "updated_at">>
  ): Promise<Monster>;
  delete(id: string): Promise<void>;
  clear(): Promise<void>;
}
