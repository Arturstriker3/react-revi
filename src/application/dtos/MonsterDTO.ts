import { Monster } from "../../domain/entities/Monster";

export interface MonsterDTO {
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

export function toMonster(dto: MonsterDTO): Monster {
  return {
    id: dto.id,
    name: dto.name,
    attack: dto.attack,
    defense: dto.defense,
    speed: dto.speed,
    hp: dto.hp,
    image_url: dto.image_url,
    created_at: dto.created_at,
    updated_at: dto.updated_at,
  };
}

export function toDTO(monster: Monster): MonsterDTO {
  return {
    id: monster.id,
    name: monster.name,
    attack: monster.attack,
    defense: monster.defense,
    speed: monster.speed,
    hp: monster.hp,
    image_url: monster.image_url,
    created_at: monster.created_at,
    updated_at: monster.updated_at,
  };
}
