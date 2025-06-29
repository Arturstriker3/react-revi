import { IMonsterRepository } from "../../domain/repositories/IMonsterRepository";
import { IMonsterBattleRepository } from "../../domain/repositories/IMonsterBattleRepository";
import { BattleResultDTO } from "../dtos/MonsterBattleDTO";
import { CalculateBattleUseCase } from "./calculateBattle";

export class CreateBattleUseCase {
  private calculateBattleUseCase: CalculateBattleUseCase;

  constructor(
    private monsterRepository: IMonsterRepository,
    private battleRepository: IMonsterBattleRepository
  ) {
    this.calculateBattleUseCase = new CalculateBattleUseCase();
  }

  async execute(
    monster1Id: string,
    monster2Id: string
  ): Promise<BattleResultDTO> {
    const monster1 = await this.monsterRepository.findById(monster1Id);
    const monster2 = await this.monsterRepository.findById(monster2Id);

    if (!monster1 || !monster2) {
      throw new Error("Um ou mais monstros não foram encontrados");
    }

    const battleResult = this.calculateBattleUseCase.execute(
      monster1,
      monster2
    );
    const savedBattle = await this.battleRepository.create(battleResult.battle);

    return {
      battle: savedBattle,
      rounds: battleResult.rounds,
    };
  }
}
