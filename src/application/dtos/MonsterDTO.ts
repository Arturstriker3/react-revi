export interface MonsterDTO {
  id: number;
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  image_url?: string | null;
}
