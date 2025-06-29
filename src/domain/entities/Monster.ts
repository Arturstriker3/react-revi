export interface Monster {
  id: number;
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  image_url?: string | null;
}

export function getCardPower(monster: Monster): number {
  return (
    monster.attack * 0.5 +
    monster.defense * 0.5 +
    monster.speed * 0.9 +
    monster.hp * 1.0
  );
}

export function getCardRarity(
  monster: Monster
): "common" | "rare" | "ultra" | "secret" {
  const weightedStats = getCardPower(monster);
  if (weightedStats >= 315) return "secret";
  if (weightedStats >= 270) return "ultra";
  if (weightedStats >= 225) return "rare";
  return "common";
}
