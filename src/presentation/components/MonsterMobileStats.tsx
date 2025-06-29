import React from "react";
import { MonsterDTO } from "../../application/dtos/MonsterDTO";
import { Progress, Card } from "antd";
import { GiSwordsPower, GiShield, GiRun, GiHeartPlus } from "react-icons/gi";
import { MONSTER_STAT_LIMITS } from "../../domain/entities/Monster";

interface MonsterMobileStatsProps {
  monster: MonsterDTO;
  className?: string;
}

const MonsterMobileStats: React.FC<MonsterMobileStatsProps> = ({
  monster,
  className = "",
}) => {
  // Função para normalizar os valores para uma escala de 0-100
  const normalizeValue = (value: number) =>
    Math.min((value / MONSTER_STAT_LIMITS.MAX_STAT) * 100, 100);

  const stats = [
    {
      name: "Ataque",
      value: monster.attack,
      icon: <GiSwordsPower className="text-red-600 text-xl" />,
      color: "#f5222d",
      maxValue: MONSTER_STAT_LIMITS.MAX_ATTACK,
    },
    {
      name: "Defesa",
      value: monster.defense,
      icon: <GiShield className="text-blue-600 text-xl" />,
      color: "#1890ff",
      maxValue: MONSTER_STAT_LIMITS.MAX_DEFENSE,
    },
    {
      name: "Velocidade",
      value: monster.speed,
      icon: <GiRun className="text-green-600 text-xl" />,
      color: "#52c41a",
      maxValue: MONSTER_STAT_LIMITS.MAX_SPEED,
    },
    {
      name: "HP",
      value: monster.hp,
      icon: <GiHeartPlus className="text-pink-600 text-xl" />,
      color: "#eb2f96",
      maxValue: MONSTER_STAT_LIMITS.MAX_HP,
    },
  ];

  return (
    <Card className={`shadow-sm ${className}`} bodyStyle={{ padding: "12px" }}>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center gap-3">
            <div className="flex items-center gap-2 min-w-[100px]">
              {stat.icon}
              <span className="text-sm font-medium text-gray-700">
                {stat.name}
              </span>
            </div>
            <div className="flex-1">
              <Progress
                percent={normalizeValue(stat.value)}
                format={() => stat.value}
                strokeColor={stat.color}
                size="small"
                showInfo={true}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MonsterMobileStats;
