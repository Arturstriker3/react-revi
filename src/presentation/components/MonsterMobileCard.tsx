import React from "react";
import {
  Monster,
  getCardRarity,
  getStarsFromRarity,
} from "../../domain/entities/Monster";
import {
  GiSwordsPower,
  GiShield,
  GiRun,
  GiHeartPlus,
  GiSparkles,
} from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import { Button, Space } from "antd";

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

const MonsterMobileCard: React.FC<MonsterMobileCardProps> = ({
  monster,
  onEdit,
  onDelete,
}) => {
  const rarity = getCardRarity(monster);
  const effects = getRarityEffects(rarity);
  const stars = getStarsFromRarity(rarity);

  return (
    <div
      className={`
        relative w-full bg-white rounded-lg overflow-hidden
        border-2 ${effects.border}
        shadow-lg transform transition-all duration-300
        hover:scale-102 ${effects.glow}
        cursor-pointer select-none
        ${effects.animation}
      `}
    >
      {/* Camada holográfica */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-20
          bg-gradient-to-r ${effects.rainbow} transition-opacity duration-300
          card-metallic-effect pointer-events-none
        `}
      />

      {/* Camada metálica */}
      <div
        className={`
          absolute inset-0 opacity-0 group-hover:opacity-30
          bg-gradient-to-br ${effects.metallic} transition-opacity duration-300
          card-metallic-effect pointer-events-none
        `}
      />

      <div className="flex items-center p-3">
        {/* Imagem do monstro */}
        <div className="relative w-16 h-16 mr-4">
          <img
            src={monster.image_url || ""}
            alt={monster.name}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Indicador de raridade */}
          {rarity !== "common" && (
            <div className="absolute -top-1 -right-1">
              <div
                className={`w-3 h-3 rounded-full ${effects.glitter} ${effects.rarityGradient}`}
              />
              <GiSparkles
                className={`absolute -top-1 -right-1 w-2 h-2 ${effects.rarityColor} animate-ping`}
              />
            </div>
          )}
        </div>

        {/* Informações do monstro */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-bold truncate ${effects.rarityColor}`}>
              {monster.name}
            </h3>
            <div className="flex items-center">
              {Array.from({ length: stars }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`
                    w-3 h-3 mx-0.5
                    ${effects.rarityColor}
                    ${rarity !== "common" ? effects.glitter : ""}
                  `}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div
            className={`
            grid grid-cols-2 gap-2 text-sm
            p-2 rounded-lg
            ${effects.rarityGradient} bg-opacity-10
          `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiSwordsPower className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-gray-700">ATK</span>
              </div>
              <span className="font-bold text-red-700">{monster.attack}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiShield className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-gray-700">DEF</span>
              </div>
              <span className="font-bold text-blue-700">{monster.defense}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiRun className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-gray-700">SPD</span>
              </div>
              <span className="font-bold text-green-700">{monster.speed}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <GiHeartPlus className="w-4 h-4 text-pink-600 mr-1" />
                <span className="text-gray-700">HP</span>
              </div>
              <span className="font-bold text-pink-700">{monster.hp}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="mt-3 flex justify-end">
            <Space>
              {onEdit && (
                <Button type="link" onClick={() => onEdit(monster)}>
                  Editar
                </Button>
              )}
              {onDelete && (
                <Button type="link" danger onClick={() => onDelete(monster)}>
                  Excluir
                </Button>
              )}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterMobileCard;
