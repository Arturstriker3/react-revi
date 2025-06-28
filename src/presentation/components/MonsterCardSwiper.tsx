import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "./MonsterCard";

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

  const handleSwipe = () => {
    setCurrentIndex((prev) => (prev + 1) % monsters.length);
  };

  // Parâmetros do leque para efeito de arco curvado
  const maxFan = monsters.length - 1;
  const arcRadius = 120; // raio do arco
  const arcAngle = 70; // ângulo total do leque em graus (mais aberto)

  return (
    <div className="flex justify-center items-center min-h-[500px]">
      <div className="relative w-[300px] h-[420px]">
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
              const offsetX = Math.sin(rad) * arcRadius;
              const offsetY = (1 - Math.cos(rad)) * arcRadius * 0.9; // 0.9 para suavizar
              const rotate = angle;
              const scale = 1 - Math.abs(rel) * 0.025;
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
          <TinderCard
            key={monsters[currentIndex].id + "-" + currentIndex}
            preventSwipe={["up", "down"]}
            className="absolute w-full h-full"
            onSwipe={handleSwipe}
            swipeRequirementType="position"
            swipeThreshold={10}
          >
            <MonsterCard monster={monsters[currentIndex]} />
          </TinderCard>
        </div>
      </div>
    </div>
  );
};

export default MonsterCardSwiper;
