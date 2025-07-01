import React, { useState, useEffect } from "react";
import {
  Monster,
  getCardRarity,
  getStarsFromRarity,
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

const getRarityEffects = (rarity: ReturnType<typeof getCardRarity>) => {
  const effects = {
    legendary: {
      shadow: "shadow-amber-500/60",
      border: "border-amber-400",
      glow: "hover:shadow-amber-500/80",
      metallic: "from-amber-400 via-yellow-300 to-amber-500",
      rainbow: "from-amber-400 via-yellow-300 to-red-500",
      glitter: "animate-pulse",
      rarityColor: "text-amber-600",
      rarityGradient:
        "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500",
      animation: "animate-legendary",
    },
    mythical: {
      shadow: "shadow-purple-500/50",
      border: "border-purple-400",
      glow: "hover:shadow-purple-500/70",
      metallic: "from-purple-400 via-fuchsia-300 to-purple-500",
      rainbow: "from-purple-400 via-fuchsia-300 to-pink-500",
      glitter: "animate-pulse",
      rarityColor: "text-purple-600",
      rarityGradient:
        "bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-500",
      animation: "animate-mythical",
    },
    epic: {
      shadow: "shadow-pink-500/40",
      border: "border-pink-400",
      glow: "hover:shadow-pink-500/60",
      metallic: "from-pink-400 via-rose-300 to-pink-500",
      rainbow: "from-pink-400 via-rose-300 to-red-500",
      glitter: "animate-pulse",
      rarityColor: "text-pink-600",
      rarityGradient: "bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500",
      animation: "animate-epic",
    },
    rare: {
      shadow: "shadow-blue-500/30",
      border: "border-blue-400",
      glow: "hover:shadow-blue-500/50",
      metallic: "from-blue-400 via-cyan-300 to-blue-500",
      rainbow: "from-blue-400 via-cyan-300 to-green-500",
      glitter: "animate-pulse",
      rarityColor: "text-blue-600",
      rarityGradient: "bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500",
      animation: "animate-rare",
    },
    uncommon: {
      shadow: "shadow-gray-500/20",
      border: "border-gray-400",
      glow: "hover:shadow-gray-500/30",
      metallic: "from-gray-400 via-slate-300 to-gray-500",
      rainbow: "from-gray-400 via-slate-300 to-gray-500",
      glitter: "",
      rarityColor: "text-gray-600",
      rarityGradient:
        "bg-gradient-to-r from-gray-400 via-slate-300 to-gray-500",
      animation: "",
    },
    common: {
      shadow: "shadow-gray-400/10",
      border: "border-gray-300",
      glow: "hover:shadow-gray-400/20",
      metallic: "from-gray-300 via-slate-200 to-gray-300",
      rainbow: "from-gray-300 via-slate-200 to-gray-300",
      glitter: "",
      rarityColor: "text-gray-500",
      rarityGradient:
        "bg-gradient-to-r from-gray-300 via-slate-200 to-gray-300",
      animation: "",
    },
  };

  return effects[rarity];
};

const MonsterCard: React.FC<MonsterCardProps> = ({ monster }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glitterParticles, setGlitterParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  const rarity = getCardRarity(monster);
  const effects = getRarityEffects(rarity);
  const stars = getStarsFromRarity(rarity);

  useEffect(() => {
    if (rarity !== "common" && rarity !== "uncommon") {
      const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setGlitterParticles(particles);
    }
  }, [rarity]);

  return (
    <div
      className={`
        relative w-full max-w-[220px] sm:max-w-[320px] aspect-[2/3] group
        bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200
        border-2 sm:border-4 ${effects.border} rounded-lg
        shadow-xl transition-shadow duration-300
        hover:shadow-2xl ${effects.glow}
        cursor-pointer select-none outline-none focus:outline-none
        ${effects.animation}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={-1}
    >
      <div
        className={`
          absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20
          bg-gradient-to-r ${effects.rainbow} transition-opacity duration-300
          card-metallic-effect pointer-events-none
          ${isHovered ? "card-rainbow-effect" : ""}
        `}
      />

      <div
        className={`
          absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30
          bg-gradient-to-br ${effects.metallic} transition-opacity duration-300
          card-metallic-effect pointer-events-none
        `}
      />

      {rarity !== "common" && rarity !== "uncommon" && (
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          {glitterParticles.map((particle) => (
            <div
              key={particle.id}
              className={`
                absolute w-1 h-1 bg-white rounded-full opacity-60
                ${effects.glitter}
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

      <div className="relative h-full flex flex-col p-2 sm:p-4 z-10 select-none">
        <div className="text-center mb-2 sm:mb-3 select-none px-2">
          <h3
            className={`
              text-base sm:text-xl font-bold truncate select-none
              ${effects.rarityColor}
            `}
          >
            {monster.name}
          </h3>
        </div>

        <div className="flex flex-col items-center gap-1 mb-2">
          <div className="flex justify-center">
            {Array.from({ length: stars }).map((_, i) => (
              <FaStar
                key={i}
                className={`
                  w-3 h-3 sm:w-4 sm:h-4 mx-0.5 transition-all duration-300
                  ${effects.rarityColor}
                  ${rarity !== "common" ? effects.glitter : ""}
                `}
              />
            ))}
          </div>
          <span
            className={`text-xs sm:text-sm font-medium ${effects.rarityColor}`}
          >
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
          </span>
        </div>

        <div className="relative flex-1 mb-2 sm:mb-3 overflow-hidden rounded-lg">
          <img
            src={getMonsterImageUrl(monster)}
            alt={monster.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
            draggable={false}
          />

          {rarity !== "common" && (
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
              <div
                className={`
                  w-2 h-2 sm:w-3 sm:h-3 rounded-full ${effects.glitter} ${effects.rarityGradient}
                `}
              />
              <GiSparkles
                className={`
                  absolute -top-1 -right-1 w-1 h-1 sm:w-2 sm:h-2
                  ${effects.rarityColor} animate-ping
                `}
              />
            </div>
          )}
        </div>

        <div
          className={`
          rounded-lg p-2 sm:p-4 border transition-all duration-300
          ${effects.rarityGradient} border-opacity-50
        `}
        >
          <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiSwordsPower className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-1.5" />
                <span className="text-gray-700 font-medium">ATK</span>
              </div>
              <span className="font-bold text-red-700">{monster.attack}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiShield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-1.5" />
                <span className="text-gray-700 font-medium">DEF</span>
              </div>
              <span className="font-bold text-blue-700">{monster.defense}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiRun className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-1.5" />
                <span className="text-gray-700 font-medium">SPD</span>
              </div>
              <span className="font-bold text-green-700">{monster.speed}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiHeartPlus className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 mr-1.5" />
                <span className="text-gray-700 font-medium">HP</span>
              </div>
              <span className="font-bold text-pink-700">{monster.hp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterCard;
