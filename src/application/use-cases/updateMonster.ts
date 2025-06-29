import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { Monster } from "../../domain/entities/Monster";
import { MonsterDTO } from "../dtos/MonsterDTO";

export class UpdateMonsterUseCase {
  constructor(private repository: IMonsterRepository) {}

  async execute(
    id: string,
    data: Partial<Omit<MonsterDTO, "id" | "created_at" | "updated_at">>
  ): Promise<Monster | null> {
    return this.repository.update(id, data);
  }
}
