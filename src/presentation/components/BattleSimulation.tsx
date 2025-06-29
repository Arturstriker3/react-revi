import React, { useState, useEffect } from "react";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "./MonsterCard";
import { Progress, Button } from "antd";
import { CrownOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useBattleStore } from "../stores/battleStore";

interface BattleSimulationProps {
  monster1: Monster;
  monster2: Monster;
  onClose?: () => void;
}

interface BattleStep {
  type: "attack" | "damage" | "speed" | "end";
  attacker: "monster1" | "monster2";
  damage?: number;
  message: string;
}

// Overlay de derrota: dois cortes diagonais vermelhos em X e filtro sépia
const BurnedOverlay: React.FC = () => (
  <div className="absolute inset-0 z-20 pointer-events-none">
    {/* Corte diagonal vermelho 1 */}
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 180 270"
      className="absolute inset-0"
      style={{ zIndex: 2 }}
    >
      <line
        x1="10"
        y1="20"
        x2="170"
        y2="250"
        stroke="#d32f2f"
        strokeWidth="12"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      <line
        x1="170"
        y1="20"
        x2="10"
        y2="250"
        stroke="#d32f2f"
        strokeWidth="12"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  </div>
);

const BattleSimulation: React.FC<BattleSimulationProps> = ({
  monster1,
  monster2,
  onClose,
}) => {
  const { calculateBattle, createBattle, loading } = useBattleStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [battleSteps, setBattleSteps] = useState<BattleStep[]>([]);
  const [monster1HP, setMonster1HP] = useState(monster1.hp);
  const [monster2HP, setMonster2HP] = useState(monster2.hp);
  const [winner, setWinner] = useState<"monster1" | "monster2" | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Processa o resultado da batalha em steps para animação
  const processBattleResult = async () => {
    try {
      const result = await calculateBattle(monster1.id, monster2.id);
      const steps: BattleStep[] = [];

      // Determina quem ataca primeiro baseado no primeiro round
      const firstAttackerId = result.rounds[0].attacker;
      const firstAttacker =
        firstAttackerId === monster1.id ? "monster1" : "monster2";

      steps.push({
        type: "speed",
        attacker: firstAttacker,
        message: `${
          firstAttacker === "monster1" ? monster1.name : monster2.name
        } começa por ser mais rápido!`,
      });

      // Processa cada round em steps de ataque e dano
      for (const round of result.rounds) {
        const isMonster1Attacking = round.attacker === monster1.id;
        const attacker = isMonster1Attacking ? "monster1" : "monster2";
        const attackerName = isMonster1Attacking
          ? monster1.name
          : monster2.name;
        const defenderName = isMonster1Attacking
          ? monster2.name
          : monster1.name;

        steps.push({
          type: "attack",
          attacker,
          message: `${attackerName} ataca!`,
        } as BattleStep);

        steps.push({
          type: "damage",
          attacker,
          damage: round.damage,
          message: `${defenderName} recebe ${round.damage} de dano!`,
        } as BattleStep);
      }

      // Adiciona o step final com o vencedor
      const battleWinner =
        result.battle.winnerId === monster1.id ? "monster1" : "monster2";
      steps.push({
        type: "end",
        attacker: battleWinner,
        message: `${
          battleWinner === "monster1" ? monster1.name : monster2.name
        } vence a batalha!`,
      });

      setBattleSteps(steps);

      // Salva a batalha no repositório
      await createBattle(monster1.id, monster2.id);

      return steps;
    } catch (error) {
      console.error("Error calculating battle:", error);
      return [];
    }
  };

  // Auto-advance battle steps
  useEffect(() => {
    if (isSimulating && currentStep < battleSteps.length) {
      const timer = setTimeout(() => {
        if (battleSteps[currentStep].type === "damage") {
          if (battleSteps[currentStep].attacker === "monster1") {
            setMonster2HP((hp) =>
              Math.max(0, hp - (battleSteps[currentStep].damage || 0))
            );
          } else {
            setMonster1HP((hp) =>
              Math.max(0, hp - (battleSteps[currentStep].damage || 0))
            );
          }
        } else if (battleSteps[currentStep].type === "end") {
          setWinner(battleSteps[currentStep].attacker);
          setIsSimulating(false);
        }
        setCurrentStep((step) => step + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isSimulating, battleSteps]);

  const startSimulation = async () => {
    setCurrentStep(0);
    setMonster1HP(monster1.hp);
    setMonster2HP(monster2.hp);
    setWinner(null);
    await processBattleResult();
    setIsSimulating(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          {/* Battle Arena */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8 min-h-[400px]">
            {/* Monster 1 */}
            <div className="relative w-full sm:w-1/3 min-w-[250px]">
              <motion.div
                animate={{
                  x:
                    battleSteps[currentStep]?.type === "attack" &&
                    battleSteps[currentStep]?.attacker === "monster1"
                      ? 20
                      : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                style={
                  winner === "monster2"
                    ? { filter: "sepia(0.7) brightness(0.85)" }
                    : {}
                }
                className="relative"
              >
                <div className="w-full aspect-[3/4] relative">
                  <MonsterCard monster={monster1} />
                  {winner === "monster1" && (
                    <div className="absolute top-2 right-2 z-30">
                      <CrownOutlined
                        style={{ fontSize: 32, color: "#FFD700" }}
                      />
                    </div>
                  )}
                  {winner === "monster2" && <BurnedOverlay />}
                </div>
              </motion.div>
              <div className="mt-4 px-2">
                <Progress
                  percent={(monster1HP / monster1.hp) * 100}
                  status="active"
                  strokeColor={{ from: "#108ee9", to: "#87d068" }}
                  format={() => `${monster1HP}/${monster1.hp}`}
                />
              </div>
            </div>

            {/* VS and Battle Log */}
            <div className="flex flex-col items-center w-full sm:w-1/3 min-w-[200px]">
              <div className="text-3xl font-bold text-yellow-500 mb-4">VS</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-100 rounded-lg p-4 text-center w-full"
                >
                  {battleSteps[currentStep]?.message || "Pronto para batalhar!"}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Monster 2 */}
            <div className="relative w-full sm:w-1/3 min-w-[250px]">
              <motion.div
                animate={{
                  x:
                    battleSteps[currentStep]?.type === "attack" &&
                    battleSteps[currentStep]?.attacker === "monster2"
                      ? -20
                      : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                style={
                  winner === "monster1"
                    ? { filter: "sepia(0.7) brightness(0.85)" }
                    : {}
                }
                className="relative"
              >
                <div className="w-full aspect-[3/4] relative">
                  <MonsterCard monster={monster2} />
                  {winner === "monster2" && (
                    <div className="absolute top-2 right-2 z-30">
                      <CrownOutlined
                        style={{ fontSize: 32, color: "#FFD700" }}
                      />
                    </div>
                  )}
                  {winner === "monster1" && <BurnedOverlay />}
                </div>
              </motion.div>
              <div className="mt-4 px-2">
                <Progress
                  percent={(monster2HP / monster2.hp) * 100}
                  status="active"
                  strokeColor={{ from: "#108ee9", to: "#87d068" }}
                  format={() => `${monster2HP}/${monster2.hp}`}
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-6">
            {!isSimulating && (
              <Button
                type="primary"
                size="large"
                onClick={startSimulation}
                loading={loading}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600"
              >
                {currentStep === 0 ? "Batalhar" : "Replay"}
              </Button>
            )}
            {onClose && (
              <Button size="large" onClick={onClose}>
                Fechar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleSimulation;
