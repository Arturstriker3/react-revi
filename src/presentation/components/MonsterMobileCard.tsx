import React, { useState } from "react";
import {
  Monster,
  getCardRarity,
  getStarsFromRarity,
} from "../../domain/entities/Monster";
import { GiSwordsPower, GiShield, GiRun, GiHeartPlus } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import { Button, Progress } from "antd";
import { MdExpandMore } from "react-icons/md";

interface MonsterMobileCardProps {
  monster: Monster;
  onEdit?: (monster: Monster) => void;
  onDelete?: (monster: Monster) => void;
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
      btnBg: "bg-amber-50 hover:bg-amber-100",
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
      btnBg: "bg-purple-50 hover:bg-purple-100",
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
      btnBg: "bg-pink-50 hover:bg-pink-100",
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
      btnBg: "bg-blue-50 hover:bg-blue-100",
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
      btnBg: "bg-gray-50 hover:bg-gray-100",
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
      btnBg: "bg-gray-50 hover:bg-gray-100",
    },
  };

  return effects[rarity];
};

const MonsterMobileCard: React.FC<MonsterMobileCardProps> = ({
  monster,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rarity = getCardRarity(monster);
  const effects = getRarityEffects(rarity);
  const stars = getStarsFromRarity(rarity);

  // Máximo para cada stat
  const maxStat = 1000;

  return (
    <div
      className={`
        w-full rounded-lg overflow-hidden bg-white
        shadow-md transition-all duration-300 ease-in-out
        ${effects.glow}
        ${effects.animation}
      `}
    >
      {/* Cabeçalho com nome */}
      <div
        className="flex items-center justify-between p-2.5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <h3 className={`font-semibold ${effects.rarityColor}`}>
            {monster.name}
          </h3>
          <div className="flex">
            {Array.from({ length: stars }).map((_, i) => (
              <FaStar
                key={i}
                className={`
                  w-3.5 h-3.5
                  ${effects.rarityColor}
                  ${rarity !== "common" ? effects.glitter : ""}
                `}
              />
            ))}
          </div>
        </div>
        <MdExpandMore
          className={`
            w-5 h-5 ${effects.rarityColor}
            transition-transform duration-300
            ${isExpanded ? "rotate-180" : "rotate-0"}
          `}
        />
      </div>

      {/* Conteúdo expandido */}
      <div
        className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
      `}
      >
        {/* Stats */}
        <div className="px-3 pt-0 pb-2 space-y-2">
          <div>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center">
                <GiSwordsPower className="w-4 h-4 text-red-500 mr-1.5" />
                <span className="text-gray-600 text-sm">ATK</span>
              </div>
              <span className="font-medium text-red-600 text-sm">
                {monster.attack}
              </span>
            </div>
            <Progress
              percent={Math.min((monster.attack / maxStat) * 100, 100)}
              size="small"
              strokeColor="#ef4444"
              showInfo={false}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center">
                <GiShield className="w-4 h-4 text-blue-500 mr-1.5" />
                <span className="text-gray-600 text-sm">DEF</span>
              </div>
              <span className="font-medium text-blue-600 text-sm">
                {monster.defense}
              </span>
            </div>
            <Progress
              percent={Math.min((monster.defense / maxStat) * 100, 100)}
              size="small"
              strokeColor="#3b82f6"
              showInfo={false}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center">
                <GiRun className="w-4 h-4 text-green-500 mr-1.5" />
                <span className="text-gray-600 text-sm">SPD</span>
              </div>
              <span className="font-medium text-green-600 text-sm">
                {monster.speed}
              </span>
            </div>
            <Progress
              percent={Math.min((monster.speed / maxStat) * 100, 100)}
              size="small"
              strokeColor="#22c55e"
              showInfo={false}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center">
                <GiHeartPlus className="w-4 h-4 text-pink-500 mr-1.5" />
                <span className="text-gray-600 text-sm">HP</span>
              </div>
              <span className="font-medium text-pink-600 text-sm">
                {monster.hp}
              </span>
            </div>
            <Progress
              percent={Math.min((monster.hp / maxStat) * 100, 100)}
              size="small"
              strokeColor="#ec4899"
              showInfo={false}
            />
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-between px-2 py-1.5 border-t border-gray-100">
          {onEdit && (
            <Button
              type="text"
              className={`${effects.rarityColor} ${effects.btnBg} rounded`}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(monster);
              }}
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              type="text"
              className="bg-red-50 hover:bg-red-100 text-red-500 rounded"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(monster);
              }}
            >
              Excluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonsterMobileCard;
