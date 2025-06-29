import { IMonsterBattleRepository } from "../../domain/repositories/IMonsterBattleRepository";
import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { MonsterBattleDTO } from "../dtos/MonsterBattleDTO";

export class GetMonsterBattlesUseCase {
  constructor(
    private monsterRepository: IMonsterRepository,
    private battleRepository: IMonsterBattleRepository
  ) {}

  async execute(monsterId: string): Promise<MonsterBattleDTO[]> {
    const monster = await this.monsterRepository.findById(monsterId);
    if (!monster) {
      throw new Error("Monstro não encontrado");
    }

    const battles = await this.battleRepository.findByMonsterId(monsterId);
    return battles;
  }
}
