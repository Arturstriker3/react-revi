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
  return (
    <Card
      className={`shadow-sm ${className}`}
      styles={{ body: { padding: "12px" } }}
    >
      <div className="space-y-2">
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
            percent={Math.min(
              (monster.attack / MONSTER_STAT_LIMITS.MAX_ATTACK) * 100,
              100
            )}
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
            percent={Math.min(
              (monster.defense / MONSTER_STAT_LIMITS.MAX_DEFENSE) * 100,
              100
            )}
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
            percent={Math.min(
              (monster.speed / MONSTER_STAT_LIMITS.MAX_SPEED) * 100,
              100
            )}
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
            percent={Math.min(
              (monster.hp / MONSTER_STAT_LIMITS.MAX_HP) * 100,
              100
            )}
            size="small"
            strokeColor="#ec4899"
            showInfo={false}
          />
        </div>
      </div>
    </Card>
  );
};

export default MonsterMobileStats;
