import { MonsterBattle } from "../../domain/entities/MonsterBattle";
import { IMonsterBattleRepository } from "../../domain/repositories/IMonsterBattleRepository";
import { v4 as uuidv4 } from "uuid";

export class MonsterBattleRepository implements IMonsterBattleRepository {
  // Armazena as batalhas em memória (simula um banco de dados)
  private battles: MonsterBattle[] = [];

  async create(
    battle: Omit<MonsterBattle, "id" | "created_at" | "updated_at">
  ): Promise<MonsterBattle> {
    // Cria uma nova batalha com ID e timestamps
    const newBattle: MonsterBattle = {
      ...battle,
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Adiciona a batalha ao array de batalhas
    this.battles.push(newBattle);
    return newBattle;
  }

  async findById(id: string): Promise<MonsterBattle | null> {
    // Busca uma batalha pelo ID
    const battle = this.battles.find((b) => b.id === id);
    return battle || null;
  }

  async findAll(): Promise<MonsterBattle[]> {
    // Retorna todas as batalhas
    return [...this.battles];
  }

  async findByMonsterId(monsterId: string): Promise<MonsterBattle[]> {
    // Busca todas as batalhas onde o monstro participou (como monster1 ou monster2)
    return this.battles.filter(
      (battle) =>
        battle.monster1Id === monsterId || battle.monster2Id === monsterId
    );
  }

  async update(
    id: string,
    battleData: Partial<MonsterBattle>
  ): Promise<MonsterBattle> {
    // Encontra o índice da batalha no array
    const battleIndex = this.battles.findIndex((b) => b.id === id);

    if (battleIndex === -1) {
      throw new Error("Batalha não encontrada");
    }

    // Atualiza os dados da batalha
    const updatedBattle: MonsterBattle = {
      ...this.battles[battleIndex],
      ...battleData,
      updated_at: new Date(),
    };

    // Substitui a batalha antiga pela atualizada
    this.battles[battleIndex] = updatedBattle;
    return updatedBattle;
  }

  async delete(id: string): Promise<void> {
    // Remove a batalha do array
    const battleIndex = this.battles.findIndex((b) => b.id === id);

    if (battleIndex === -1) {
      throw new Error("Batalha não encontrada");
    }

    this.battles.splice(battleIndex, 1);
  }
}
