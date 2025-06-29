import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { Monster } from "../../domain/entities/Monster";

export class GetAllMonstersUseCase {
  constructor(private repository: IMonsterRepository) {}

  async execute(): Promise<Monster[]> {
    return this.repository.findAll();
  }
}
