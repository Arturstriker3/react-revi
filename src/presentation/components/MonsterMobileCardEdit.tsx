import React, { useState } from "react";
import {
  Monster,
  getCardRarity,
  getStarsFromRarity,
} from "../../domain/entities/Monster";
import { getMonsterImageUrl } from "../lib/monsterImage";
import { Card, Button } from "antd";
import {
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";

interface MonsterMobileCardEditProps {
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
      glitter: "animate-pulse",
      rarityColor: "text-amber-600",
      rarityGradient:
        "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500",
      cardBg: "from-amber-50 to-amber-100/50",
      btnBg: "bg-amber-50 hover:bg-amber-100",
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
      btnBg: "bg-purple-50 hover:bg-purple-100",
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
      btnBg: "bg-pink-50 hover:bg-pink-100",
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
      btnBg: "bg-blue-50 hover:bg-blue-100",
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
      btnBg: "bg-gray-50 hover:bg-gray-100",
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
      btnBg: "bg-gray-50 hover:bg-gray-100",
    },
  };

  return effects[rarity];
};

const MonsterMobileCardEdit: React.FC<MonsterMobileCardEditProps> = ({
  monster,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
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
      {/* Cabeçalho com nome e botão de expandir */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-1.5">
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
          ${isExpanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex items-center gap-3">
          {/* Monster Image */}
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

          {/* Stats Grid */}
          <div className="flex-grow grid grid-cols-2 gap-x-2 gap-y-1">
            <div className="flex items-center gap-1 text-xs">
              <ThunderboltOutlined className="text-red-500" />
              <span className="text-gray-500">ATK</span>
              <span className="ml-auto font-medium">{monster.attack}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <SafetyCertificateOutlined className="text-blue-500" />
              <span className="text-gray-500">DEF</span>
              <span className="ml-auto font-medium">{monster.defense}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <RocketOutlined className="text-green-500" />
              <span className="text-gray-500">SPD</span>
              <span className="ml-auto font-medium">{monster.speed}</span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <HeartOutlined className="text-pink-500" />
              <span className="text-gray-500">HP</span>
              <span className="ml-auto font-medium">{monster.hp}</span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-between mt-3 pt-2 border-t border-gray-100">
          {onEdit && (
            <Button
              type="text"
              className="flex-1 mr-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
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
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded"
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
    </Card>
  );
};

export default MonsterMobileCardEdit;
