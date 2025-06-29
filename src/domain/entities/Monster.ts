export interface Monster {
  id: string;
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  image_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export const MONSTER_STAT_LIMITS = {
  MAX_STAT: 1000,
  MAX_ATTACK: 1000,
  MAX_DEFENSE: 1000,
  MAX_SPEED: 1000,
  MAX_HP: 1000,
} as const;

export interface ValidationError {
  field: string;
  message: string;
}

export function validateMonsterStats(
  monster: Partial<Monster>
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (monster.attack !== undefined) {
    if (monster.attack < 0 || monster.attack > MONSTER_STAT_LIMITS.MAX_ATTACK) {
      errors.push({
        field: "attack",
        message: `Attack must be between 0 and ${MONSTER_STAT_LIMITS.MAX_ATTACK}`,
      });
    }
  }

  if (monster.defense !== undefined) {
    if (
      monster.defense < 0 ||
      monster.defense > MONSTER_STAT_LIMITS.MAX_DEFENSE
    ) {
      errors.push({
        field: "defense",
        message: `Defense must be between 0 and ${MONSTER_STAT_LIMITS.MAX_DEFENSE}`,
      });
    }
  }

  if (monster.speed !== undefined) {
    if (monster.speed < 0 || monster.speed > MONSTER_STAT_LIMITS.MAX_SPEED) {
      errors.push({
        field: "speed",
        message: `Speed must be between 0 and ${MONSTER_STAT_LIMITS.MAX_SPEED}`,
      });
    }
  }

  if (monster.hp !== undefined) {
    if (monster.hp < 0 || monster.hp > MONSTER_STAT_LIMITS.MAX_HP) {
      errors.push({
        field: "hp",
        message: `HP must be between 0 and ${MONSTER_STAT_LIMITS.MAX_HP}`,
      });
    }
  }

  return errors;
}

export function getCardPower(monster: Monster): number {
  return Math.floor(
    monster.attack * 0.5 +
      monster.defense * 0.5 +
      monster.speed * 0.9 +
      monster.hp * 1.0
  );
}

export type MonsterRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "mythical"
  | "legendary";

export function getCardRarity(monster: Monster): MonsterRarity {
  const power = getCardPower(monster);

  if (power >= 950) return "legendary";
  if (power >= 750) return "mythical";
  if (power >= 550) return "epic";
  if (power >= 250) return "rare";
  if (power >= 50) return "uncommon";
  return "common";
}

export function getStarsFromRarity(rarity: MonsterRarity): number {
  switch (rarity) {
    case "legendary":
      return 5;
    case "mythical":
      return 4;
    case "epic":
      return 3;
    case "rare":
      return 2;
    case "uncommon":
      return 1;
    default:
      return 0;
  }
}
