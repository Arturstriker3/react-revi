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

const monsterPrefixes = [
  "Dragão",
  "Golem",
  "Fênix",
  "Hidra",
  "Quimera",
  "Basilisco",
  "Grifo",
  "Kraken",
  "Leviatã",
  "Behemoth",
  "Wyrm",
  "Titan",
  "Cerberus",
  "Manticore",
  "Wyvern",
];

const monsterSuffixes = [
  "das Sombras",
  "da Luz",
  "do Abismo",
  "Celestial",
  "Infernal",
  "Primordial",
  "Ancestral",
  "Eterno",
  "Dimensional",
  "Elemental",
  "do Caos",
  "da Ordem",
  "Místico",
  "Arcano",
  "Transcendental",
];

function generateMonsterName(): string {
  const prefix =
    monsterPrefixes[Math.floor(Math.random() * monsterPrefixes.length)];
  const suffix =
    monsterSuffixes[Math.floor(Math.random() * monsterSuffixes.length)];
  return `${prefix} ${suffix}`;
}

function generateStatsForRarity(
  targetRarity: MonsterRarity
): Pick<Monster, "attack" | "defense" | "speed" | "hp"> {
  const rarityPowerRanges = {
    legendary: { min: 950, max: 1000 },
    mythical: { min: 750, max: 949 },
    epic: { min: 550, max: 749 },
    rare: { min: 250, max: 549 },
    uncommon: { min: 50, max: 249 },
    common: { min: 0, max: 49 },
  };

  const range = rarityPowerRanges[targetRarity];
  const targetPower =
    Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

  const baseTotal = targetPower * 2;
  const stats = {
    attack: Math.floor(baseTotal * (0.2 + Math.random() * 0.1)),
    defense: Math.floor(baseTotal * (0.2 + Math.random() * 0.1)),
    speed: Math.floor(baseTotal * (0.2 + Math.random() * 0.1)),
    hp: Math.floor(baseTotal * (0.2 + Math.random() * 0.1)),
  };

  const maxStat = MONSTER_STAT_LIMITS.MAX_STAT;
  stats.attack = Math.min(stats.attack, maxStat);
  stats.defense = Math.min(stats.defense, maxStat);
  stats.speed = Math.min(stats.speed, maxStat);
  stats.hp = Math.min(stats.hp, maxStat);

  return stats;
}

export function generateMonster(
  targetRarity: MonsterRarity = "common"
): Omit<Monster, "id" | "created_at" | "updated_at"> {
  const stats = generateStatsForRarity(targetRarity);

  return {
    name: generateMonsterName(),
    ...stats,
    image_url: null,
  };
}

export function generateInitialDeck(): Omit<
  Monster,
  "id" | "created_at" | "updated_at"
>[] {
  const deck: Omit<Monster, "id" | "created_at" | "updated_at">[] = [];

  const rarities: MonsterRarity[] = [
    "legendary",
    "mythical",
    "epic",
    "rare",
    "uncommon",
  ];
  rarities.forEach((rarity) => {
    deck.push(generateMonster(rarity));
  });

  while (deck.length < 10) {
    deck.push(generateMonster("uncommon"));
  }

  return deck;
}
