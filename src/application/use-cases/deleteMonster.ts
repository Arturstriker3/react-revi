import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";

export class DeleteMonsterUseCase {
  constructor(private repository: IMonsterRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
