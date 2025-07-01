import React, { useState, useEffect } from "react";
import { Monster } from "../../domain/entities/Monster";
import MonsterMobileCard from "./MonsterMobileCard";
import { Progress, Button } from "antd";
import { CrownOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useBattleStore } from "../stores/battleStore";

interface BattleMobileSimulationProps {
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

const BurnedOverlay: React.FC = () => (
  <div className="absolute inset-0 z-20 pointer-events-none">
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

const BattleMobileSimulation: React.FC<BattleMobileSimulationProps> = ({
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

  const processBattleResult = async () => {
    try {
      const result = await calculateBattle(monster1.id, monster2.id);
      const steps: BattleStep[] = [];

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

      await createBattle(monster1.id, monster2.id);

      return steps;
    } catch (error) {
      console.error("Error calculating battle:", error);
      return [];
    }
  };

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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full h-full flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="w-full">
              <motion.div
                animate={{
                  y:
                    battleSteps[currentStep]?.type === "attack" &&
                    battleSteps[currentStep]?.attacker === "monster1"
                      ? 10
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
                <div className="relative">
                  <MonsterMobileCard monster={monster1} />
                  {winner === "monster1" && (
                    <div className="absolute top-2 right-2 z-30">
                      <CrownOutlined
                        style={{ fontSize: 24, color: "#FFD700" }}
                      />
                    </div>
                  )}
                  {winner === "monster2" && <BurnedOverlay />}
                </div>
                <div className="mt-2">
                  <Progress
                    percent={(monster1HP / monster1.hp) * 100}
                    status="active"
                    strokeColor={{ from: "#108ee9", to: "#87d068" }}
                    format={() => `${monster1HP}/${monster1.hp}`}
                    size="small"
                  />
                </div>
              </motion.div>
            </div>

            <div className="w-full">
              <div className="text-2xl font-bold text-yellow-500 text-center mb-2">
                VS
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-100 rounded-lg p-3 text-center text-sm"
                >
                  {battleSteps[currentStep]?.message || "Pronto para batalhar!"}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full">
              <motion.div
                animate={{
                  y:
                    battleSteps[currentStep]?.type === "attack" &&
                    battleSteps[currentStep]?.attacker === "monster2"
                      ? -10
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
                <div className="relative">
                  <MonsterMobileCard monster={monster2} />
                  {winner === "monster2" && (
                    <div className="absolute top-2 right-2 z-30">
                      <CrownOutlined
                        style={{ fontSize: 24, color: "#FFD700" }}
                      />
                    </div>
                  )}
                  {winner === "monster1" && <BurnedOverlay />}
                </div>
                <div className="mt-2">
                  <Progress
                    percent={(monster2HP / monster2.hp) * 100}
                    status="active"
                    strokeColor={{ from: "#108ee9", to: "#87d068" }}
                    format={() => `${monster2HP}/${monster2.hp}`}
                    size="small"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {!isSimulating && (
              <Button
                type="primary"
                size="middle"
                onClick={startSimulation}
                loading={loading}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600"
              >
                {currentStep === 0 ? "Batalhar" : "Replay"}
              </Button>
            )}
            {onClose && (
              <Button size="middle" onClick={onClose}>
                Fechar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleMobileSimulation;
