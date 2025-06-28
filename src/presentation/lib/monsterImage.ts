import { Monster } from "../../domain/entities/Monster";

function getDiceBearStyle(monsterName: string): string {
  const name = monsterName.toLowerCase();
  if (name.includes("dragão") || name.includes("dragon")) return "bottts"; // robótico/dragão
  if (name.includes("lobo") || name.includes("wolf")) return "adventurer"; // aventureiro/lobo
  if (name.includes("golem")) return "lorelei"; // estilo mais "pedra"
  if (name.includes("fantasma") || name.includes("ghost")) return "identicon";
  if (name.includes("fada") || name.includes("fairy")) return "miniavs";
  // Adicione mais padrões conforme desejar
  return "bottts"; // padrão
}

/**
 * Retorna a URL da imagem do monstro: usa image_url se existir, senão gera DiceBear com estilo temático.
 */
export function getMonsterImageUrl(
  monster: Pick<Monster, "id" | "name" | "image_url">
): string {
  if (monster.image_url) return monster.image_url;
  const style = getDiceBearStyle(monster.name);
  const seed = encodeURIComponent(`${monster.id}-${monster.name}`);
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
}
