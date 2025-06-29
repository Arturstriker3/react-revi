import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";

export class DeleteMonster {
  constructor(private repository: IMonsterRepository) {}

  execute(id: string): boolean {
    const deleted = this.repository.delete(id);
    return !!deleted;
  }
}
