import React, { useState, useEffect } from "react";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "./MonsterCard";
import { Progress, Button } from "antd";
import { CrownOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [battleSteps, setBattleSteps] = useState<BattleStep[]>([]);
  const [monster1HP, setMonster1HP] = useState(monster1.hp);
  const [monster2HP, setMonster2HP] = useState(monster2.hp);
  const [winner, setWinner] = useState<"monster1" | "monster2" | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Calculate battle steps
  useEffect(() => {
    const steps: BattleStep[] = [];

    // Determine who goes first based on speed
    const firstAttacker: "monster1" | "monster2" =
      monster1.speed >= monster2.speed ? "monster1" : "monster2";
    steps.push({
      type: "speed",
      attacker: firstAttacker,
      message: `${
        firstAttacker === "monster1" ? monster1.name : monster2.name
      } moves first due to higher speed!`,
    });

    let currentMonster1HP = monster1.hp;
    let currentMonster2HP = monster2.hp;
    let currentAttacker = firstAttacker;

    while (currentMonster1HP > 0 && currentMonster2HP > 0) {
      const attackingMonster =
        currentAttacker === "monster1" ? monster1 : monster2;
      const defendingMonster =
        currentAttacker === "monster1" ? monster2 : monster1;

      // Calculate damage
      const damage = Math.max(
        Math.floor(
          attackingMonster.attack * (Math.random() * 0.2 + 0.9) -
            defendingMonster.defense * 0.5
        ),
        1
      );

      steps.push({
        type: "attack",
        attacker: currentAttacker,
        message: `${attackingMonster.name} attacks!`,
      });

      steps.push({
        type: "damage",
        attacker: currentAttacker,
        damage,
        message: `${defendingMonster.name} takes ${damage} damage!`,
      });

      if (currentAttacker === "monster1") {
        currentMonster2HP -= damage;
      } else {
        currentMonster1HP -= damage;
      }

      currentAttacker =
        currentAttacker === "monster1" ? "monster2" : "monster1";
    }

    // Add end step
    const battleWinner: "monster1" | "monster2" =
      currentMonster1HP > 0 ? "monster1" : "monster2";
    steps.push({
      type: "end",
      attacker: battleWinner,
      message: `${
        battleWinner === "monster1" ? monster1.name : monster2.name
      } wins the battle!`,
    });

    setBattleSteps(steps);
  }, [monster1, monster2]);

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

  const startSimulation = () => {
    setCurrentStep(0);
    setMonster1HP(monster1.hp);
    setMonster2HP(monster2.hp);
    setWinner(null);
    setIsSimulating(true);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Battle Arena */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
            {/* Monster 1 */}
            <div className="relative">
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
              >
                <MonsterCard monster={monster1} />
                {winner === "monster1" && (
                  <div className="absolute top-2 right-2 z-30">
                    <CrownOutlined style={{ fontSize: 32, color: "#FFD700" }} />
                  </div>
                )}
                {winner === "monster2" && <BurnedOverlay />}
              </motion.div>
              <div className="mt-4">
                <Progress
                  percent={(monster1HP / monster1.hp) * 100}
                  status="active"
                  strokeColor={{ from: "#108ee9", to: "#87d068" }}
                  format={() => `${monster1HP}/${monster1.hp}`}
                />
              </div>
            </div>

            {/* VS and Battle Log */}
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-yellow-500 mb-4">VS</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-100 rounded-lg p-4 text-center min-w-[200px]"
                >
                  {battleSteps[currentStep]?.message || "Ready to battle!"}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Monster 2 */}
            <div className="relative">
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
              >
                <MonsterCard monster={monster2} />
                {winner === "monster2" && (
                  <div className="absolute top-2 right-2 z-30">
                    <CrownOutlined style={{ fontSize: 32, color: "#FFD700" }} />
                  </div>
                )}
                {winner === "monster1" && <BurnedOverlay />}
              </motion.div>
              <div className="mt-4">
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
          <div className="flex justify-center gap-4">
            {!isSimulating && (
              <Button
                type="primary"
                size="large"
                icon={<ThunderboltOutlined />}
                onClick={startSimulation}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600"
              >
                {currentStep === 0 ? "Start Battle" : "Replay Battle"}
              </Button>
            )}
            {onClose && (
              <Button size="large" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleSimulation;
