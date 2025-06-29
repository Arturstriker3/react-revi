import {
  MonsterBattle,
  BattleRound,
  BattleResult,
} from "../../domain/entities/MonsterBattle";

export interface MonsterBattleDTO
  extends Omit<MonsterBattle, "id" | "created_at" | "updated_at"> {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface BattleRoundDTO extends BattleRound {}

export interface BattleResultDTO extends Omit<BattleResult, "battle"> {
  battle: MonsterBattleDTO;
}
