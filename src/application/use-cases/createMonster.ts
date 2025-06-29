import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { Monster } from "../../domain/entities/Monster";
import { MonsterDTO } from "../dtos/MonsterDTO";

export class CreateMonsterUseCase {
  constructor(private repository: IMonsterRepository) {}

  async execute(
    data: Omit<MonsterDTO, "id" | "created_at" | "updated_at">
  ): Promise<Monster> {
    return this.repository.create(data);
  }
}
