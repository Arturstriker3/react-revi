import { Monster } from "../entities/Monster";

export interface IMonsterRepository {
  getAll(): Promise<Monster[]>;
  getById(id: string): Promise<Monster | null>;
  create(
    monster: Omit<Monster, "id" | "created_at" | "updated_at">
  ): Promise<Monster>;
  update(
    id: string,
    monster: Partial<Omit<Monster, "id" | "created_at" | "updated_at">>
  ): Promise<Monster | null>;
  delete(id: string): Promise<boolean>;
}
