import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "./MonsterCard";
import shuffleSoundUrl from "../assets/sounds/card-shuffle.mp3";
import { useMonsterStore } from "../stores/monsterStore";

const MonsterCardSwiper: React.FC = () => {
  const { monsters } = useMonsterStore();
  const [currentIndex, setCurrentIndex] = useState(0); // Começar do primeiro monstro
  const [isEntering, setIsEntering] = useState(false);
  const [lastDirection, setLastDirection] = useState<"left" | "right">("right");

  // Referência para o efeito sonoro
  const shuffleSoundRef = useRef<HTMLAudioElement | null>(
    typeof Audio !== "undefined"
      ? (() => {
          const audio = new Audio(shuffleSoundUrl);
          audio.volume = 0.15;
          return audio;
        })()
      : null
  );

  // Se não houver monstros, não renderiza nada
  if (monsters.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[300px] sm:min-h-[500px] px-2 sm:px-4">
        <div className="text-gray-400">Carregando monstros...</div>
      </div>
    );
  }

  const handleSwipe = (dir?: "left" | "right") => {
    // Toca o som de shuffle
    if (shuffleSoundRef.current) {
      shuffleSoundRef.current.currentTime = 0;
      shuffleSoundRef.current.play();
    }
    if (dir) setLastDirection(dir);
    setIsEntering(true);
    setCurrentIndex((prev) => (prev + 1) % monsters.length);
    setTimeout(() => setIsEntering(false), 200);
  };

  // Garante que o currentIndex é válido
  const safeCurrentIndex = currentIndex % monsters.length;
  const currentMonster = monsters[safeCurrentIndex];

  // Parâmetros do leque para efeito de arco curvado
  const maxFan = monsters.length - 1;
  const arcRadius = 200; // raio do arco (mais largo)
  const arcAngle = 90; // ângulo total do leque em graus (mais aberto)

  return (
    <div className="flex justify-center items-center min-h-[300px] sm:min-h-[500px] px-2 sm:px-4">
      <div className="relative w-[180px] h-[240px] sm:w-[300px] sm:h-[420px]">
        {/* Leque de cartas (sempre atrás) */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {monsters
            .map((monster, i) => {
              const relIndex =
                (i - safeCurrentIndex + monsters.length) % monsters.length;
              if (relIndex === 0) return null; // topo será TinderCard
              return { monster, relIndex };
            })
            .filter(
              (item): item is { monster: Monster; relIndex: number } =>
                item !== null
            )
            .sort((a, b) => b.relIndex - a.relIndex)
            .map(({ monster, relIndex }) => {
              const center = maxFan / 2;
              const rel = relIndex - center;
              const angle = (rel / maxFan) * arcAngle;
              const rad = (angle * Math.PI) / 180;
              const arcRadiusMobile = 90;
              const arcRadiusDesktop = 200;
              const currentArcRadius =
                window.innerWidth < 640 ? arcRadiusMobile : arcRadiusDesktop;
              const offsetX = Math.sin(rad) * currentArcRadius;
              const offsetY = (1 - Math.cos(rad)) * currentArcRadius * 0.9;
              const rotate = angle;
              const scale = 1 - Math.abs(rel) * 0.01;
              const style = {
                transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${rotate}deg)`,
                zIndex: relIndex,
                pointerEvents: "none" as React.CSSProperties["pointerEvents"],
                transition: "transform 0.3s",
              };
              return (
                <div
                  key={monster.id + "-" + safeCurrentIndex}
                  className="absolute w-full h-full"
                  style={style}
                >
                  <MonsterCard monster={monster} />
                </div>
              );
            })}
        </div>
        {/* Card do topo (interativo) - sempre acima do leque */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 2,
            transform: "translate(0px, 0px) scale(1) rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          {/* Setas minimalistas para indicar swipe */}
          <div className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <path
                d="M12 3L6 9L12 15"
                stroke="#888"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
            </svg>
          </div>
          <div className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <path
                d="M6 3L12 9L6 15"
                stroke="#888"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
            </svg>
          </div>
          <div
            className={`absolute w-full h-full transition-all duration-200 ${
              isEntering
                ? (lastDirection === "right"
                    ? "-translate-x-6 sm:-translate-x-8"
                    : "translate-x-6 sm:translate-x-8") + " opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <TinderCard
              key={currentMonster.id + "-" + safeCurrentIndex}
              preventSwipe={["up", "down"]}
              className="absolute w-full h-full"
              onSwipe={(dir) => handleSwipe(dir as "left" | "right")}
              swipeRequirementType="position"
              swipeThreshold={10}
            >
              <MonsterCard monster={currentMonster} />
            </TinderCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterCardSwiper;
