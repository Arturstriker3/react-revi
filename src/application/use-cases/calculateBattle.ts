import { Monster } from "../../domain/entities/Monster";
import {
  BattleResult,
  BattleRound,
  MonsterBattle,
} from "../../domain/entities/MonsterBattle";
import { v4 as uuidv4 } from "uuid";

/**
 * Caso de uso responsável por calcular o resultado de uma batalha entre dois monstros
 *
 * @args monster1 Primeiro monstro da batalha com seus atributos (ataque, defesa, velocidade, hp)
 * @args monster2 Segundo monstro da batalha com seus atributos (ataque, defesa, velocidade, hp)
 *
 * @returns BattleResult Objeto contendo:
 * - battle: Dados da batalha (IDs dos monstros, turnos, vencedor)
 * - rounds: Array com detalhes de cada round (dano causado, HP restante)
 *
 * Regras da batalha:
 * 1. O monstro com maior velocidade ataca primeiro
 * 2. Em caso de empate de velocidade, o com maior ataque começa
 * 3. Dano = ataque do atacante - defesa do defensor (mínimo 1)
 * 4. Batalha continua até um dos monstros ficar com 0 HP
 */
export class CalculateBattleUseCase {
  execute(monster1: Monster, monster2: Monster): BattleResult {
    // Cria cópias para não modificar os objetos originais
    const fighter1 = { ...monster1 };
    const fighter2 = { ...monster2 };

    // Define a ordem dos atacantes baseado na velocidade e ataque
    let firstAttacker: typeof fighter1;
    let secondAttacker: typeof fighter2;

    if (
      fighter1.speed > fighter2.speed ||
      (fighter1.speed === fighter2.speed && fighter1.attack >= fighter2.attack)
    ) {
      firstAttacker = fighter1;
      secondAttacker = fighter2;
    } else {
      firstAttacker = fighter2;
      secondAttacker = fighter1;
    }

    // Inicializa contadores e estado da batalha
    const rounds: BattleRound[] = [];
    let turns = 0;
    let currentHp1 = fighter1.hp;
    let currentHp2 = fighter2.hp;

    // Loop principal da batalha
    while (currentHp1 > 0 && currentHp2 > 0) {
      turns++;

      // Ataque do primeiro lutador
      const damage1 = Math.max(
        1, // Dano mínimo é 1
        firstAttacker.attack - secondAttacker.defense // Dano base: ataque - defesa
      );
      currentHp2 -= damage1;
      rounds.push({
        attacker: firstAttacker.id,
        defender: secondAttacker.id,
        damage: damage1,
        remainingHp: Math.max(0, currentHp2), // Garante que HP não fique negativo
      });

      // Verifica se a batalha terminou após o primeiro ataque
      if (currentHp2 <= 0) break;

      // Ataque do segundo lutador
      const damage2 = Math.max(
        1,
        secondAttacker.attack - firstAttacker.defense
      );
      currentHp1 -= damage2;
      rounds.push({
        attacker: secondAttacker.id,
        defender: firstAttacker.id,
        damage: damage2,
        remainingHp: Math.max(0, currentHp1),
      });
    }

    // Cria o objeto de batalha com o resultado
    const battle: MonsterBattle = {
      id: uuidv4(),
      monster1Id: fighter1.id,
      monster2Id: fighter2.id,
      turns, // Número total de turnos que a batalha durou
      winnerId: currentHp1 > 0 ? fighter1.id : fighter2.id, // ID do monstro vencedor
      created_at: new Date(),
      updated_at: new Date(),
    };

    return {
      battle,
      rounds, // Histórico detalhado de cada round
    };
  }
}
