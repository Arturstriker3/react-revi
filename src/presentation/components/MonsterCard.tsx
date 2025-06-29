import React, { useState, useEffect } from "react";
import {
  Monster,
  getCardPower,
  getCardRarity,
} from "../../domain/entities/Monster";
import { getMonsterImageUrl } from "../lib/monsterImage";
import {
  GiSwordsPower,
  GiShield,
  GiRun,
  GiHeartPlus,
  GiSparkles,
} from "react-icons/gi";
import { FaStar } from "react-icons/fa";

interface MonsterCardProps {
  monster: Monster;
}

// Interface para definir a raridade e efeitos visuais da carta
interface CardRarity {
  rarity: "common" | "rare" | "ultra" | "secret";
  effects: {
    shadow: string;
    border: string;
    glow: string;
    metallic: string;
    rainbow: string;
    glitter: string;
    rarityColor: string;
    rarityGradient: string;
  };
  level: number;
  totalStats: number;
}

const MonsterCard: React.FC<MonsterCardProps> = ({ monster }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitterParticles, setGlitterParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  // Calcula a raridade da carta baseada na soma total dos stats com pesos específicos
  const calculateCardRarity = (): CardRarity => {
    const weightedStats = getCardPower(monster);
    const rarity = getCardRarity(monster);
    const level = Math.floor(weightedStats / 45) + 1; // Ajustado para os pesos
    const effects = getRarityEffects(rarity, monster.name);
    return {
      rarity,
      effects,
      level,
      totalStats: weightedStats,
    };
  };

  // Define os efeitos visuais baseados na raridade e tipo de monstro
  const getRarityEffects = (rarity: string, monsterName: string) => {
    const name = monsterName.toLowerCase();

    // Efeitos base para cada raridade
    const baseEffects = {
      secret: {
        shadow: "shadow-yellow-500/40",
        border: "border-yellow-400",
        glow: "hover:shadow-yellow-500/60",
        metallic: "from-yellow-400 via-amber-300 to-yellow-500",
        rainbow: "from-yellow-400 via-orange-400 to-red-500",
        glitter: "animate-pulse",
        rarityColor: "text-yellow-600",
        rarityGradient:
          "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500",
      },
      ultra: {
        shadow: "shadow-purple-500/40",
        border: "border-purple-400",
        glow: "hover:shadow-purple-500/60",
        metallic: "from-purple-400 via-pink-300 to-purple-500",
        rainbow: "from-purple-400 via-pink-400 to-red-500",
        glitter: "animate-pulse",
        rarityColor: "text-purple-600",
        rarityGradient:
          "bg-gradient-to-r from-purple-400 via-pink-300 to-purple-500",
      },
      rare: {
        shadow: "shadow-blue-500/30",
        border: "border-blue-400",
        glow: "hover:shadow-blue-500/50",
        metallic: "from-blue-400 via-cyan-300 to-blue-500",
        rainbow: "from-blue-400 via-cyan-400 to-green-500",
        glitter: "animate-pulse",
        rarityColor: "text-blue-600",
        rarityGradient:
          "bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500",
      },
      common: {
        shadow: "shadow-gray-500/20",
        border: "border-gray-400",
        glow: "hover:shadow-gray-500/30",
        metallic: "from-gray-400 via-slate-300 to-gray-500",
        rainbow: "from-gray-400 via-slate-300 to-gray-500",
        glitter: "",
        rarityColor: "text-gray-600",
        rarityGradient:
          "bg-gradient-to-r from-gray-400 via-slate-300 to-gray-500",
      },
    };

    // Efeitos especiais para tipos específicos de monstros
    if (name.includes("dragão") || name.includes("dragon")) {
      return {
        ...baseEffects[rarity as keyof typeof baseEffects],
        shadow: "shadow-red-500/40",
        border: "border-red-400",
        glow: "hover:shadow-red-500/60",
        metallic: "from-red-400 via-orange-300 to-red-500",
        rainbow: "from-red-400 via-orange-400 to-yellow-500",
      };
    }

    if (
      name.includes("lobo") ||
      name.includes("wolf") ||
      name.includes("sombrio")
    ) {
      return {
        ...baseEffects[rarity as keyof typeof baseEffects],
        shadow: "shadow-purple-500/40",
        border: "border-purple-400",
        glow: "hover:shadow-purple-500/60",
        metallic: "from-purple-400 via-indigo-300 to-purple-500",
        rainbow: "from-purple-400 via-indigo-400 to-blue-500",
      };
    }

    if (name.includes("cristal") || name.includes("golem")) {
      return {
        ...baseEffects[rarity as keyof typeof baseEffects],
        shadow: "shadow-cyan-500/40",
        border: "border-cyan-400",
        glow: "hover:shadow-cyan-500/60",
        metallic: "from-cyan-400 via-blue-300 to-cyan-500",
        rainbow: "from-cyan-400 via-blue-400 to-purple-500",
      };
    }

    return baseEffects[rarity as keyof typeof baseEffects];
  };

  const cardRarity = calculateCardRarity();

  // Gera partículas de glitter para cartas raras
  useEffect(() => {
    if (cardRarity.rarity !== "common") {
      const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setGlitterParticles(particles);
    }
  }, [monster, cardRarity.rarity]);

  return (
    <div
      className={`
        relative w-full max-w-[180px] sm:max-w-[280px] aspect-[2/3] group
        bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200
        border-2 sm:border-4 ${cardRarity.effects.border} rounded-lg
        shadow-xl transform transition-all duration-300
        hover:scale-105 hover:shadow-2xl ${cardRarity.effects.glow}
        cursor-pointer select-none outline-none focus:outline-none
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={-1}
    >
      {/* Camada holográfica com efeito arco-íris */}
      <div
        className={`
          absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20
          bg-gradient-to-r ${
            cardRarity.effects.rainbow
          } transition-opacity duration-300
          card-metallic-effect pointer-events-none
          ${isHovered ? "card-rainbow-effect" : ""}
        `}
      />

      {/* Camada metálica */}
      <div
        className={`
          absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30
          bg-gradient-to-br ${cardRarity.effects.metallic} transition-opacity duration-300
          card-metallic-effect pointer-events-none
        `}
      />

      {/* Efeito glitter para cartas raras */}
      {cardRarity.rarity !== "common" && (
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          {glitterParticles.map((particle) => (
            <div
              key={particle.id}
              className={`
                absolute w-1 h-1 bg-white rounded-full opacity-60
                card-glitter-effect ${cardRarity.effects.glitter}
              `}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      )}

      {/* Conteúdo da carta */}
      <div className="relative h-full flex flex-col p-2 sm:p-4 z-10 select-none">
        {/* Nome com efeito de raridade */}
        <div className="text-center mb-2 sm:mb-3 select-none">
          <h3
            className={`
              text-sm sm:text-lg font-bold truncate select-none
              ${
                cardRarity.rarity !== "common"
                  ? cardRarity.effects.rarityColor
                  : "text-gray-800"
              }
              transition-colors duration-300
            `}
          >
            {monster.name}
          </h3>
        </div>

        {/* Estrelas de nível sempre douradas */}
        <div className="flex justify-center mb-2 sm:mb-3">
          {Array.from({ length: Math.min(cardRarity.level, 8) }).map((_, i) => (
            <FaStar
              key={i}
              className={`
                w-3 h-3 sm:w-4 sm:h-4 mx-0.5 transition-all duration-300
                text-yellow-400
                ${cardRarity.rarity !== "common" ? "animate-pulse" : ""}
              `}
            />
          ))}
        </div>

        {/* Imagem do monstro com efeitos aprimorados */}
        <div className="flex-1 relative mb-3 sm:mb-4 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border-2 border-amber-300 overflow-hidden">
          <img
            src={getMonsterImageUrl(monster)}
            alt={monster.name}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
            draggable={false}
          />

          {/* Indicador de raridade aprimorado */}
          {cardRarity.rarity !== "common" && (
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
              <div
                className={`
                  w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse
                  ${cardRarity.effects.rarityGradient}
                  shadow-lg
                `}
              />
              <GiSparkles
                className={`
                  absolute -top-1 -right-1 w-1 h-1 sm:w-2 sm:h-2
                  ${cardRarity.rarity === "secret" ? "text-yellow-400" : ""}
                  ${cardRarity.rarity === "ultra" ? "text-purple-400" : ""}
                  ${cardRarity.rarity === "rare" ? "text-blue-400" : ""}
                  animate-ping
                `}
              />
            </div>
          )}
        </div>

        {/* Stats com aprimoramento de raridade */}
        <div
          className={`
          rounded-lg p-2 sm:p-3 border transition-all duration-300
          ${
            cardRarity.rarity !== "common"
              ? `bg-gradient-to-r ${cardRarity.effects.rarityGradient} border-amber-400`
              : "bg-gradient-to-r from-gray-200 to-gray-300 border-gray-400"
          }
        `}
        >
          <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
            {/* Ataque */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiSwordsPower className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mr-1" />
                <span className="text-gray-700 font-medium text-xs">ATK</span>
              </div>
              <span className="font-bold text-red-700 text-sm sm:text-base">
                {monster.attack}
              </span>
            </div>

            {/* Defesa */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiShield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1" />
                <span className="text-gray-700 font-medium text-xs">DEF</span>
              </div>
              <span className="font-bold text-blue-700 text-sm sm:text-base">
                {monster.defense}
              </span>
            </div>

            {/* Velocidade */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiRun className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1" />
                <span className="text-gray-700 font-medium text-xs">SPD</span>
              </div>
              <span className="font-bold text-green-700 text-sm sm:text-base">
                {monster.speed}
              </span>
            </div>

            {/* HP */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiHeartPlus className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600 mr-1" />
                <span className="text-gray-700 font-medium text-xs">HP</span>
              </div>
              <span className="font-bold text-pink-700 text-sm sm:text-base">
                {monster.hp}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;
