export interface MonsterBattle {
  id: string;
  monster1Id: string;
  monster2Id: string;
  turns: number;
  winnerId: string;
  created_at: Date;
  updated_at: Date;
}

export interface BattleRound {
  attacker: string;
  defender: string;
  damage: number;
  remainingHp: number;
}

export interface BattleResult {
  battle: MonsterBattle;
  rounds: BattleRound[];
}
