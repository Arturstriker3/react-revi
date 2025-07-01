import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { Monster, validateMonsterStats } from "../../domain/entities/Monster";
import { MonsterDTO } from "../dtos/MonsterDTO";

export class CreateMonsterUseCase {
  constructor(private repository: IMonsterRepository) {}

  async execute(
    data: Omit<MonsterDTO, "id" | "created_at" | "updated_at">
  ): Promise<Monster> {
    const validationErrors = validateMonsterStats(data);
    if (validationErrors.length > 0) {
      throw new Error(
        `Invalid monster stats: ${validationErrors
          .map((error) => error.message)
          .join(", ")}`
      );
    }

    return this.repository.create(data);
  }
}
