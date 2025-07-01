import React from "react";
import {
  Monster,
  getCardRarity,
  getStarsFromRarity,
} from "../../domain/entities/Monster";
import { getMonsterImageUrl } from "../lib/monsterImage";
import { Card } from "antd";
import { GiSwordsPower, GiShield, GiRun, GiHeartPlus } from "react-icons/gi";
import { FaStar } from "react-icons/fa";

interface MonsterMobileCardProps {
  monster: Monster;
}

const getRarityEffects = (rarity: ReturnType<typeof getCardRarity>) => {
  const effects = {
    legendary: {
      shadow: "shadow-amber-500/60",
      border: "border-amber-400",
      glow: "hover:shadow-amber-500/80",
      metallic: "from-amber-400 via-yellow-300 to-amber-500",
      glitter: "animate-pulse",
      rarityColor: "text-amber-600",
      rarityGradient:
        "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500",
      cardBg: "from-amber-50 to-amber-100/50",
    },
    mythical: {
      shadow: "shadow-purple-500/50",
      border: "border-purple-400",
      glow: "hover:shadow-purple-500/70",
      metallic: "from-purple-400 via-fuchsia-300 to-purple-500",
      glitter: "animate-pulse",
      rarityColor: "text-purple-600",
      rarityGradient:
        "bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-500",
      cardBg: "from-purple-50 to-purple-100/50",
    },
    epic: {
      shadow: "shadow-pink-500/40",
      border: "border-pink-400",
      glow: "hover:shadow-pink-500/60",
      metallic: "from-pink-400 via-rose-300 to-pink-500",
      glitter: "animate-pulse",
      rarityColor: "text-pink-600",
      rarityGradient: "bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500",
      cardBg: "from-pink-50 to-pink-100/50",
    },
    rare: {
      shadow: "shadow-blue-500/30",
      border: "border-blue-400",
      glow: "hover:shadow-blue-500/50",
      metallic: "from-blue-400 via-cyan-300 to-blue-500",
      glitter: "animate-pulse",
      rarityColor: "text-blue-600",
      rarityGradient: "bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500",
      cardBg: "from-blue-50 to-blue-100/50",
    },
    uncommon: {
      shadow: "shadow-gray-500/20",
      border: "border-gray-400",
      glow: "hover:shadow-gray-500/30",
      metallic: "from-gray-400 via-slate-300 to-gray-500",
      glitter: "",
      rarityColor: "text-gray-600",
      rarityGradient:
        "bg-gradient-to-r from-gray-400 via-slate-300 to-gray-500",
      cardBg: "from-gray-50 to-gray-100/50",
    },
    common: {
      shadow: "shadow-gray-400/10",
      border: "border-gray-300",
      glow: "hover:shadow-gray-400/20",
      metallic: "from-gray-300 via-slate-200 to-gray-300",
      glitter: "",
      rarityColor: "text-gray-500",
      rarityGradient:
        "bg-gradient-to-r from-gray-300 via-slate-200 to-gray-300",
      cardBg: "from-gray-50 to-gray-100/50",
    },
  };

  return effects[rarity];
};

const MonsterMobileCard: React.FC<MonsterMobileCardProps> = ({ monster }) => {
  const rarity = getCardRarity(monster);
  const effects = getRarityEffects(rarity);
  const stars = getStarsFromRarity(rarity);

  return (
    <Card
      className={`
        w-full bg-gradient-to-br ${effects.cardBg}
        ${effects.shadow} ${effects.glow}
        transition-all duration-300 ease-in-out
        border-[1.5px] ${effects.border}
      `}
      styles={{ body: { padding: "12px" } }}
    >
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={getMonsterImageUrl({
              id: monster.id,
              name: monster.name,
              image_url: monster.image_url,
            })}
            alt={monster.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-1.5 mb-1">
            <div className={`text-sm font-semibold ${effects.rarityColor}`}>
              {monster.name}
            </div>
            <div className="flex">
              {Array.from({ length: stars }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`
                    w-3 h-3
                    ${effects.rarityColor}
                    ${rarity !== "common" ? effects.glitter : ""}
                  `}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <div className="flex items-center gap-1 text-xs">
              <GiSwordsPower className="text-red-500" />
              <span className="text-gray-500">ATK</span>
              <span className="ml-auto font-medium">{monster.attack}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <GiShield className="text-blue-500" />
              <span className="text-gray-500">DEF</span>
              <span className="ml-auto font-medium">{monster.defense}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <GiRun className="text-green-500" />
              <span className="text-gray-500">SPD</span>
              <span className="ml-auto font-medium">{monster.speed}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <GiHeartPlus className="text-pink-500" />
              <span className="text-gray-500">HP</span>
              <span className="ml-auto font-medium">{monster.hp}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonsterMobileCard;
