export interface MonsterDTO {
  id: string; // UID
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  image_url?: string | null;
  created_at: Date;
  updated_at: Date;
}
