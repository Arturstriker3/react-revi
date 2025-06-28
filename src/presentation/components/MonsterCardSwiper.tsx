import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "./MonsterCard";
import shuffleSoundUrl from "../assets/sounds/card-shuffle.mp3";

// Exemplo de 10 monstros
const monsters: Monster[] = [
  {
    id: 1,
    name: "Dragão Flamejante",
    attack: 95,
    defense: 80,
    speed: 70,
    hp: 120,
    image_url: null,
  },
  {
    id: 2,
    name: "Lobo Sombrio",
    attack: 75,
    defense: 60,
    speed: 95,
    hp: 90,
    image_url: null,
  },
  {
    id: 3,
    name: "Golem de Cristal",
    attack: 60,
    defense: 95,
    speed: 30,
    hp: 110,
    image_url: null,
  },
  {
    id: 4,
    name: "Fada da Luz",
    attack: 40,
    defense: 50,
    speed: 100,
    hp: 80,
    image_url: null,
  },
  {
    id: 5,
    name: "Serpente Abissal",
    attack: 85,
    defense: 60,
    speed: 80,
    hp: 100,
    image_url: null,
  },
  {
    id: 6,
    name: "Minotauro Selvagem",
    attack: 90,
    defense: 70,
    speed: 60,
    hp: 110,
    image_url: null,
  },
  {
    id: 7,
    name: "Fênix Rubra",
    attack: 80,
    defense: 55,
    speed: 100,
    hp: 95,
    image_url: null,
  },
  {
    id: 8,
    name: "Cavaleiro Fantasma",
    attack: 70,
    defense: 85,
    speed: 75,
    hp: 105,
    image_url: null,
  },
  {
    id: 9,
    name: "Tigre das Sombras",
    attack: 88,
    defense: 65,
    speed: 90,
    hp: 92,
    image_url: null,
  },
  {
    id: 10,
    name: "Gárgula de Pedra",
    attack: 65,
    defense: 100,
    speed: 40,
    hp: 120,
    image_url: null,
  },
];

const MonsterCardSwiper: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
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
                (i - currentIndex + monsters.length) % monsters.length;
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
              const angle = (rel / maxFan) * arcAngle; // de -arcAngle/2 a +arcAngle/2
              const rad = (angle * Math.PI) / 180;
              const arcRadiusMobile = 90; // raio menor para mobile
              const arcRadiusDesktop = 200; // raio original para desktop
              const arcRadius =
                window.innerWidth < 640 ? arcRadiusMobile : arcRadiusDesktop;
              const offsetX = Math.sin(rad) * arcRadius;
              const offsetY = (1 - Math.cos(rad)) * arcRadius * 0.9;
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
                  key={monster.id + "-" + currentIndex}
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
              key={monsters[currentIndex].id + "-" + currentIndex}
              preventSwipe={["up", "down"]}
              className="absolute w-full h-full"
              onSwipe={(dir) => handleSwipe(dir as "left" | "right")}
              swipeRequirementType="position"
              swipeThreshold={10}
            >
              <MonsterCard monster={monsters[currentIndex]} />
            </TinderCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterCardSwiper;
