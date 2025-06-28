import { useState, useEffect } from "react";
import { Button, Badge } from "antd";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  ScissorOutlined,
  StarOutlined,
  EyeOutlined,
  CrownOutlined,
  BugOutlined,
  TeamOutlined,
  GiftOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Monster } from "../../domain/entities/Monster";
import MonsterCard from "../components/MonsterCard";

const duelMonsters: Monster[] = [
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
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<Monster | null>(null);
  const [duelAnimation, setDuelAnimation] = useState(false);
  const [mysticalEffect, setMysticalEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMysticalEffect(true);
      setTimeout(() => setMysticalEffect(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const startDuel = () => {
    setDuelAnimation(true);
    setTimeout(() => setDuelAnimation(false), 3000);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-hidden relative">
      {/* Mystical Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23FFD700 fillOpacity=0.1%3E%3Cpath d=M30 30l15-15v30l-15-15zm0 0l-15 15h30l-15-15z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      {/* Floating Mystical Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full ${
            mysticalEffect ? "animate-ping" : "animate-pulse"
          }`}
        ></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>

        {/* Egyptian Hieroglyph-like symbols */}
        <div className="absolute top-1/4 left-1/2 text-6xl text-yellow-400/20 animate-pulse">
          𓂀
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-4xl text-purple-400/20 animate-bounce">
          𓁹
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 backdrop-blur-sm bg-black/40 border-b border-yellow-600/30">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center border-2 border-yellow-500 shadow-lg shadow-yellow-500/50">
              <BugOutlined className="text-xl text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                MONSTER ARENA
              </h1>
              <p className="text-xs text-gray-400">SHADOW EDITION</p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#cards"
              className="hover:text-yellow-400 transition-colors font-medium"
            >
              Monstros
            </a>
            <a
              href="#duel"
              className="hover:text-yellow-400 transition-colors font-medium"
            >
              Arena
            </a>
            <a
              href="#tournament"
              className="hover:text-yellow-400 transition-colors font-medium"
            >
              Torneios
            </a>
            <a
              href="#collection"
              className="hover:text-yellow-400 transition-colors font-medium"
            >
              Coleção
            </a>
          </div>

          <Button
            type="primary"
            size="large"
            className="bg-gradient-to-r from-yellow-600 to-yellow-800 border-none hover:from-yellow-700 hover:to-yellow-900 shadow-lg shadow-yellow-600/30"
            icon={<DashboardOutlined />}
            onClick={goToDashboard}
          >
            Entrar na Arena
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-block mb-6">
              <Badge.Ribbon
                text="SHADOW EDITION"
                color="gold"
                className="text-xs"
              >
                <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl border border-yellow-600/50">
                  <h2 className="text-7xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-2xl">
                    MONSTER
                  </h2>
                  <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    ARENA
                  </h3>
                </div>
              </Badge.Ribbon>
            </div>
          </div>

          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Desperte o poder das trevas e da luz. Invoque criaturas lendárias,
            domine magias ancestrais e torne-se o Mestre dos Monstros neste
            universo épico inspirado nos mistérios do antigo mundo.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-purple-600 to-purple-800 border-none hover:from-purple-700 hover:to-purple-900 h-16 px-10 text-lg shadow-lg shadow-purple-600/30"
              icon={<ThunderboltOutlined />}
              onClick={startDuel}
            >
              Iniciar Batalha das Sombras
            </Button>
            <Button
              size="large"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black h-16 px-10 text-lg backdrop-blur-sm bg-black/20"
              icon={<EyeOutlined />}
            >
              Assistir Trailer Épico
            </Button>
          </div>

          {/* Mystical Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                label: "Monstros Místicos",
                value: "500+",
                icon: <BugOutlined />,
                color: "purple",
              },
              {
                label: "Guerreiros Ativos",
                value: "10K+",
                icon: <TeamOutlined />,
                color: "blue",
              },
              {
                label: "Batalhas Diárias",
                value: "50K+",
                icon: <ScissorOutlined />,
                color: "red",
              },
              {
                label: "Torneios Épicos",
                value: "24/7",
                icon: <TrophyOutlined />,
                color: "yellow",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div className={`text-4xl text-${stat.color}-400 mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Showcase */}
      <section id="cards" className="py-24 px-6 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              MONSTROS LENDÁRIOS
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cada criatura possui poder ancestral. Domine os segredos da
              batalha e invoque as criaturas mais temidas do reino das sombras.
            </p>
          </div>

          <div className="flex justify-center items-center gap-12">
            {duelMonsters.map((monster) => (
              <div
                key={monster.id}
                className="transform hover:scale-110 transition-all duration-500 hover:-translate-y-4 cursor-pointer"
                onClick={() => setSelectedCard(monster)}
              >
                <MonsterCard monster={monster} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Duel Arena */}
      <section
        id="duel"
        className="py-24 px-6 bg-gradient-to-r from-purple-900/30 to-black/30 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent">
              ARENA DAS SOMBRAS
            </h3>
            <p className="text-xl text-gray-300">
              Onde lendas nascem e destinos são selados
            </p>
          </div>

          <div className="bg-gradient-to-br from-black/60 to-purple-900/60 rounded-3xl p-8 backdrop-blur-sm border-2 border-yellow-600/30 shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              {/* Player 1 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-blue-400 shadow-lg shadow-blue-500/50">
                  <BugOutlined className="text-4xl text-white" />
                </div>
                <h4 className="text-xl font-bold text-blue-400 mb-2">
                  GUERREIRO
                </h4>
                <div className="text-sm text-gray-300">HP: 100</div>
                <div className="text-xs text-gray-400">Monstros: 3</div>
              </div>

              {/* VS Section */}
              <div className="text-center">
                <div
                  className={`text-8xl mb-4 ${
                    duelAnimation
                      ? "animate-pulse text-red-500"
                      : "text-yellow-400"
                  }`}
                >
                  ⚡
                </div>
                <Button
                  type="primary"
                  size="large"
                  className="bg-gradient-to-r from-red-600 to-purple-600 border-none hover:from-red-700 hover:to-purple-700 px-8 py-3 text-lg shadow-lg shadow-red-600/30"
                  onClick={startDuel}
                  loading={duelAnimation}
                  icon={<ThunderboltOutlined />}
                >
                  {duelAnimation
                    ? "BATALHA EM ANDAMENTO!"
                    : "INICIAR BATALHA DAS SOMBRAS"}
                </Button>
                <div className="mt-4 text-sm text-gray-400">
                  "O coração dos monstros guiará sua vitória"
                </div>
              </div>

              {/* Player 2 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center mb-4 mx-auto border-4 border-purple-400 shadow-lg shadow-purple-500/50">
                  <CrownOutlined className="text-4xl text-white" />
                </div>
                <h4 className="text-xl font-bold text-purple-400 mb-2">
                  SOMBRA
                </h4>
                <div className="text-sm text-gray-300">HP: 100</div>
                <div className="text-xs text-gray-400">Monstros: 3</div>
              </div>
            </div>

            {/* Game Features */}
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <ScissorOutlined className="text-3xl text-red-400 mb-3" />
                <h5 className="font-bold mb-2 text-white">Invocações Épicas</h5>
                <p className="text-sm text-gray-300">
                  Invoque monstros lendários
                </p>
              </div>
              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <FireOutlined className="text-3xl text-yellow-400 mb-3" />
                <h5 className="font-bold mb-2 text-white">
                  Poderes Ancestrais
                </h5>
                <p className="text-sm text-gray-300">
                  Domine habilidades poderosas
                </p>
              </div>
              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <SafetyOutlined className="text-3xl text-blue-400 mb-3" />
                <h5 className="font-bold mb-2 text-white">Defesas Místicas</h5>
                <p className="text-sm text-gray-300">
                  Proteja-se com barreiras mágicas
                </p>
              </div>
              <div className="bg-black/40 rounded-xl p-4 border border-gray-700/50">
                <TrophyOutlined className="text-3xl text-purple-400 mb-3" />
                <h5 className="font-bold mb-2 text-white">Vitória Suprema</h5>
                <p className="text-sm text-gray-300">
                  Torne-se o Mestre dos Monstros
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Section */}
      <section id="tournament" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent">
              TORNEIOS MÍSTICOS
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrophyOutlined className="text-4xl text-yellow-400" />,
                title: "Campeonato Mundial",
                description: "Compete contra os melhores domadores do mundo",
                reward: "Monstros Exclusivos + 100,000 XP",
              },
              {
                icon: <CrownOutlined className="text-4xl text-purple-400" />,
                title: "Torneio das Sombras",
                description: "Apenas os mais corajosos ousam participar",
                reward: "Título de Mestre das Sombras",
              },
              {
                icon: <FireOutlined className="text-4xl text-red-400" />,
                title: "Arena do Dragão",
                description: "Desperte os poderes dos dragões ancestrais",
                reward: "Dragões Lendários + Raridades",
              },
              {
                icon: (
                  <ThunderboltOutlined className="text-4xl text-blue-400" />
                ),
                title: "Liga dos Elementos",
                description: "Domine todos os atributos elementais",
                reward: "Monstros Elementais Supremos",
              },
              {
                icon: <StarOutlined className="text-4xl text-green-400" />,
                title: "Batalha dos Deuses",
                description: "Enfrente as criaturas mais poderosas",
                reward: "Monstros Divinos Ancestrais",
              },
              {
                icon: <GiftOutlined className="text-4xl text-pink-400" />,
                title: "Evento Semanal",
                description: "Novos desafios toda semana",
                reward: "Pacotes Premium",
              },
            ].map((tournament, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                <div className="mb-4">{tournament.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-white">
                  {tournament.title}
                </h4>
                <p className="text-gray-300 mb-4 text-sm">
                  {tournament.description}
                </p>
                <div className="bg-yellow-600/20 rounded-lg p-3 border border-yellow-600/30">
                  <div className="text-xs text-yellow-400 font-semibold mb-1">
                    RECOMPENSA:
                  </div>
                  <div className="text-sm text-white">{tournament.reward}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-black via-purple-900/50 to-black relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">𓁹</div>
            <h3 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              SEU DESTINO AGUARDA
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Os monstros do destino foram invocados. O poder das trevas e da
              luz está em suas mãos. Você tem coragem para enfrentar a batalha
              suprema?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-yellow-600 to-red-600 border-none hover:from-yellow-700 hover:to-red-700 h-20 px-12 text-xl shadow-2xl shadow-yellow-600/30"
              icon={<PlayCircleOutlined />}
              onClick={goToDashboard}
            >
              DESPERTAR O PODER
            </Button>
            <Button
              size="large"
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black h-20 px-12 text-xl backdrop-blur-sm bg-black/20"
              icon={<EyeOutlined />}
            >
              ASSISTIR GAMEPLAY
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black/80 relative z-10 border-t border-yellow-600/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center border-2 border-yellow-500">
                <BugOutlined className="text-black" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  MONSTER ARENA
                </span>
                <div className="text-xs text-gray-400">SHADOW EDITION</div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="text-gray-400 text-sm mb-2">
                © 2024 Monster Arena. Todos os direitos reservados.
              </div>
              <div className="text-xs text-gray-500">
                "O coração dos monstros nunca mente" - Mestre Ancestral
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
