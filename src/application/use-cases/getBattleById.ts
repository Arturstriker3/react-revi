import { IMonsterBattleRepository } from "../../domain/repositories/IMonsterBattleRepository";
import { MonsterBattleDTO } from "../dtos/MonsterBattleDTO";

export class GetBattleByIdUseCase {
  constructor(private battleRepository: IMonsterBattleRepository) {}

  async execute(id: string): Promise<MonsterBattleDTO | null> {
    const battle = await this.battleRepository.findById(id);

    if (!battle) {
      return null;
    }

    return battle;
  }
}
