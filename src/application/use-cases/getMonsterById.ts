import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { Monster } from "../../domain/entities/Monster";

export class GetMonsterByIdUseCase {
  constructor(private repository: IMonsterRepository) {}

  async execute(id: string): Promise<Monster | null> {
    return this.repository.findById(id);
  }
}
