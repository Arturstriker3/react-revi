import React from "react";
import { Monster, getCardPower } from "../../domain/entities/Monster";
import MonsterCard from "./MonsterCard";
import { CrownOutlined } from "@ant-design/icons";

interface BattleCardVsProps {
  card1: Monster;
  card2: Monster;
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

const BattleCardVs: React.FC<BattleCardVsProps> = ({ card1, card2 }) => {
  const power1 = getCardPower(card1);
  const power2 = getCardPower(card2);
  const isCard1Weaker = power1 < power2;
  const isCard2Weaker = power2 < power1;
  const isCard1Winner = power1 > power2;
  const isCard2Winner = power2 > power1;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-8">
      <div className="flex flex-col w-full sm:w-auto">
        <div className="self-start sm:self-auto relative">
          {isCard1Winner && (
            <span className="absolute top-2 right-2 z-30">
              <CrownOutlined
                style={{
                  fontSize: 32,
                  color: "#FFD700",
                  filter: "drop-shadow(0 0 6px #FFD70088)",
                }}
              />
            </span>
          )}
          <div
            style={
              isCard1Weaker ? { filter: "sepia(0.7) brightness(0.85)" } : {}
            }
          >
            <MonsterCard monster={card1} />
          </div>
          {isCard1Weaker && <BurnedOverlay />}
        </div>
        <div className="sm:hidden flex-1 flex items-center justify-center mt-2 mb-2">
          <span className="block text-3xl font-extrabold text-yellow-400 rotate-[-20deg] drop-shadow-lg select-none">
            VS
          </span>
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-center mx-2">
        <span className="text-2xl sm:text-4xl font-extrabold text-yellow-400 drop-shadow-lg select-none">
          VS
        </span>
      </div>
      <div className="flex flex-col w-full sm:w-auto justify-end items-end">
        <div className="self-end sm:self-auto relative mt-auto">
          {isCard2Winner && (
            <span className="absolute top-2 right-2 z-30">
              <CrownOutlined
                style={{
                  fontSize: 32,
                  color: "#FFD700",
                  filter: "drop-shadow(0 0 6px #FFD70088)",
                }}
              />
            </span>
          )}
          <div
            style={
              isCard2Weaker ? { filter: "sepia(0.7) brightness(0.85)" } : {}
            }
          >
            <MonsterCard monster={card2} />
          </div>
          {isCard2Weaker && <BurnedOverlay />}
        </div>
      </div>
    </div>
  );
};

export default BattleCardVs;
