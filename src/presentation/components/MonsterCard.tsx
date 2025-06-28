import React from "react";
import { Monster } from "../../domain/entities/Monster";
import { getMonsterImageUrl } from "../lib/monsterImage";
import {
  GiSwordsPower,
  GiShield,
  GiRun,
  GiHeartPlus,
  GiCrystalEye,
} from "react-icons/gi";

interface MonsterCardProps {
  monster: Monster;
}

const MonsterCard: React.FC<MonsterCardProps> = ({ monster }) => {
  // Calculate rarity based on total stats
  const totalStats =
    monster.attack + monster.defense + monster.speed + monster.hp;
  const getRarity = () => {
    if (totalStats >= 350) return "secret";
    if (totalStats >= 300) return "ultra";
    if (totalStats >= 250) return "rare";
    return "common";
  };

  // Get holographic effect based on monster name
  const getHolographicEffect = () => {
    const name = monster.name.toLowerCase();

    if (name.includes("dragão") || name.includes("dragon")) {
      return {
        shadow: "shadow-red-500/30",
        border: "border-red-400",
        glow: "hover:shadow-red-500/50",
      };
    }

    if (
      name.includes("lobo") ||
      name.includes("wolf") ||
      name.includes("sombrio")
    ) {
      return {
        shadow: "shadow-purple-500/30",
        border: "border-purple-400",
        glow: "hover:shadow-purple-500/50",
      };
    }

    if (name.includes("cristal") || name.includes("golem")) {
      return {
        shadow: "shadow-cyan-500/30",
        border: "border-cyan-400",
        glow: "hover:shadow-cyan-500/50",
      };
    }

    // Default effect
    return {
      shadow: "shadow-gray-500/20",
      border: "border-gray-400",
      glow: "hover:shadow-gray-500/30",
    };
  };

  const rarity = getRarity();
  const level = Math.floor(totalStats / 50) + 1;
  const holoEffect = getHolographicEffect();

  return (
    <div
      className={`
      relative w-full max-w-[180px] sm:max-w-[280px] aspect-[2/3] group
      bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200
      border-2 sm:border-4 ${holoEffect.border} rounded-lg
      shadow-xl transform transition-all duration-300
      hover:scale-105 hover:shadow-2xl ${holoEffect.glow}
      cursor-pointer select-none outline-none focus:outline-none
    `}
      tabIndex={-1}
    >
      {/* Card Content */}
      <div className="relative h-full flex flex-col p-2 sm:p-4 z-10 select-none">
        {/* Name */}
        <div className="text-center mb-2 sm:mb-3 select-none">
          <h3 className="text-sm sm:text-lg font-bold text-gray-800 truncate select-none">
            {monster.name}
          </h3>
        </div>

        {/* Level Stars */}
        <div className="flex justify-center mb-2 sm:mb-3">
          {Array.from({ length: Math.min(level, 8) }).map((_, i) => (
            <GiCrystalEye
              key={i}
              className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mx-0.5"
            />
          ))}
        </div>

        {/* Monster Image */}
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

          {/* Rarity indicator */}
          {rarity !== "common" && (
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
              <div
                className={`
                w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse
                ${rarity === "secret" ? "bg-yellow-400" : ""}
                ${rarity === "ultra" ? "bg-purple-400" : ""}
                ${rarity === "rare" ? "bg-blue-400" : ""}
              `}
              />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-amber-200 to-yellow-200 rounded-lg p-2 sm:p-3 border border-amber-400">
          <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm">
            {/* Attack */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiSwordsPower className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mr-1" />
                <span className="text-gray-700 font-medium text-xs">ATK</span>
              </div>
              <span className="font-bold text-red-700 text-sm sm:text-base">
                {monster.attack}
              </span>
            </div>

            {/* Defense */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiShield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mr-1" />
                <span className="text-gray-700 font-medium text-xs">DEF</span>
              </div>
              <span className="font-bold text-blue-700 text-sm sm:text-base">
                {monster.defense}
              </span>
            </div>

            {/* Speed */}
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
