import { MonsterBattle } from "../entities/MonsterBattle";

export interface IMonsterBattleRepository {
  // Cria uma nova batalha no banco de dados
  create(
    battle: Omit<MonsterBattle, "id" | "created_at" | "updated_at">
  ): Promise<MonsterBattle>;

  // Busca uma batalha específica pelo ID
  findById(id: string): Promise<MonsterBattle | null>;

  // Lista todas as batalhas
  findAll(): Promise<MonsterBattle[]>;

  // Lista todas as batalhas de um monstro específico (como participante)
  findByMonsterId(monsterId: string): Promise<MonsterBattle[]>;

  // Atualiza os dados de uma batalha
  update(id: string, battle: Partial<MonsterBattle>): Promise<MonsterBattle>;

  // Remove uma batalha do banco de dados
  delete(id: string): Promise<void>;
}
