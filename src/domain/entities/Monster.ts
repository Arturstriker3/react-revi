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
