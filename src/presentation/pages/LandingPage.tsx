import { useState, useEffect } from "react";
import { Button, Badge, Drawer } from "antd";
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
  TeamOutlined,
  GiftOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Monster, generateInitialDeck } from "../../domain/entities/Monster";
import MonsterCardSwiper from "../components/MonsterCardSwiper";
import { GiDragonHead, GiHamburgerMenu } from "react-icons/gi";
import FloatingActionButton from "../components/FloatingActionButton";
import AOS from "aos";
import { motion } from "framer-motion";
import BattleCardVs from "../components/BattleCardVs";
import { useMonsterStore } from "../stores/monsterStore";

const STORAGE_KEY = "monster_arena_initial_deck_seeded";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { monsters, createMonster } = useMonsterStore();
  const [duelAnimation, setDuelAnimation] = useState(false);
  const [mysticalEffect, setMysticalEffect] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Verifica e gera o deck inicial
  useEffect(() => {
    const checkAndGenerateInitialDeck = async () => {
      const hasSeeded = localStorage.getItem(STORAGE_KEY);

      if (!hasSeeded && monsters.length === 0) {
        const initialDeck = generateInitialDeck();

        // Cria cada monstro sequencialmente
        for (const monster of initialDeck) {
          try {
            await createMonster(monster);
          } catch (error) {
            console.error("Erro ao criar monstro inicial:", error);
          }
        }

        localStorage.setItem(STORAGE_KEY, "true");
      }
    };

    checkAndGenerateInitialDeck();
  }, [createMonster, monsters.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMysticalEffect(true);
      setTimeout(() => setMysticalEffect(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    AOS.init({ duration: 900, once: true, offset: 60 });
  }, []);

  const startDuel = () => {
    setDuelAnimation(true);
    setTimeout(() => setDuelAnimation(false), 3000);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: "cards", label: "Monstros" },
    { id: "duel", label: "Arena" },
    { id: "tournament", label: "Torneios" },
    { id: "collection", label: "Coleção" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white overflow-hidden relative">
      {/* Parallax Background Layer */}
      <div className="fixed inset-0 w-full h-[350px] bg-gradient-to-b from-yellow-400/20 via-purple-900/10 to-transparent opacity-80 pointer-events-none z-0" />
      {/* Parallax SVG Layer */}
      <div className="fixed left-1/2 -translate-x-1/2 top-0 w-[180px] h-[180px] opacity-20 z-0 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 10 Q70 30 50 50 Q30 70 50 90"
            stroke="#FFD700"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      {/* Mystical Background Pattern (mantido para textura) */}
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

      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-black/80 border-b border-yellow-600/50 shadow-lg"
            : "backdrop-blur-sm bg-black/40 border-b border-yellow-600/30"
        }`}
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div
              className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center border-2 border-yellow-500 shadow-lg shadow-yellow-500/50 cursor-pointer"
              aria-label="Voltar ao topo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              tabIndex={0}
              role="button"
            >
              <GiDragonHead className="text-2xl text-black" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                MONSTER ARENA
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                SHADOW EDITION
              </p>
            </div>
          </div>

          {/* Navegação e botão alinhados à direita */}
          <div className="hidden md:flex flex-1 justify-end items-center space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-yellow-400 transition-colors font-medium text-sm lg:text-base"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-yellow-600 to-yellow-800 border-none hover:from-yellow-700 hover:to-yellow-900 shadow-lg shadow-yellow-600/30"
              onClick={goToDashboard}
            >
              Batalhar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="Abrir menu"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <GiHamburgerMenu className="text-black text-2xl" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <Drawer
        closable={false}
        title={
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center border-2 border-yellow-500 shadow-lg shadow-yellow-500/30 cursor-pointer">
                <GiDragonHead className="text-2xl text-black" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                MONSTER ARENA
              </span>
            </div>
            <button
              aria-label="Fechar menu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 border-2 border-yellow-500 shadow-lg shadow-yellow-500/30 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ml-4"
              style={{ border: "none" }}
            >
              <CloseOutlined className="text-2xl text-black" />
            </button>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="bg-black/95 backdrop-blur-md"
        styles={{
          body: {
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100vw",
            maxWidth: "100vw",
          },
          header: {
            background: "rgba(0,0,0,0.8)",
            borderBottom: "1px solid rgba(234, 179, 8, 0.3)",
            padding: "16px 24px",
          },
          mask: { background: "rgba(0,0,0,0.8)" },
        }}
        width="100vw"
      >
        <div className="w-full flex flex-col justify-center items-center h-full p-6">
          <Button
            type="primary"
            size="large"
            className="w-full max-w-xs h-16 text-lg bg-gradient-to-r from-yellow-600 to-yellow-800 border-none hover:from-yellow-700 hover:to-yellow-900 shadow-lg shadow-yellow-600/30"
            onClick={goToDashboard}
          >
            Batalhar
          </Button>
        </div>
      </Drawer>

      {/* Hero Section - Adjusted for mobile */}
      <section className="relative z-10 pt-32 sm:pt-40 pb-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-full flex justify-center mb-4 sm:mb-6">
            <Badge.Ribbon
              text="SHADOW EDITION"
              color="gold"
              className="text-xs"
            >
              <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl bg-black/60 backdrop-blur-sm px-4 py-6 sm:px-8 sm:py-10 rounded-2xl border border-yellow-600/50 flex flex-col items-center">
                <motion.h2
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2, type: "spring" }}
                  className="w-full text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-2xl text-center"
                >
                  MONSTER
                </motion.h2>
                <motion.h3
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  className="w-full text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent text-center"
                >
                  ARENA
                </motion.h3>
              </div>
            </Badge.Ribbon>
          </div>

          <p className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            Desperte o poder das trevas e da luz. Invoque criaturas lendárias,
            domine magias ancestrais e torne-se o Mestre dos Monstros neste
            universo épico inspirado nos mistérios do antigo mundo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
            <a
              href="https://www.youtube.com/watch?v=BBJa32lCaaY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black h-12 sm:h-16 px-6 sm:px-10 text-base sm:text-lg backdrop-blur-sm bg-black/20 rounded-lg transition-colors duration-200 font-medium"
              style={{ textDecoration: "none" }}
            >
              <EyeOutlined className="mr-2" />
              Assistir Trailer Épico
            </a>
          </div>

          {/* Mystical Stats - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
            {[
              {
                label: "Monstros Místicos",
                value: "500+",
                icon: <GiDragonHead />,
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
                className="text-center p-4 sm:p-6 rounded-xl bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300"
              >
                <div
                  className={`flex justify-center items-center w-full mb-2 sm:mb-3`}
                >
                  <span
                    className={`text-2xl sm:text-4xl text-${stat.color}-400 flex items-center justify-center`}
                  >
                    {stat.icon}
                  </span>
                </div>
                <div className="text-xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Showcase */}
      <section
        id="cards"
        className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 bg-black/20"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              MONSTROS LENDÁRIOS
            </h3>
            <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Cada criatura possui poder ancestral. Domine os segredos da
              batalha e invoque as criaturas mais temidas do reino das sombras.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <MonsterCardSwiper />
          </div>
        </div>
      </section>

      {/* Duel Arena - Mobile Optimized */}
      <section
        id="duel"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-purple-900/30 to-black/30 relative z-10"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent">
              ARENA DAS SOMBRAS
            </h3>
            <p className="text-base sm:text-xl text-gray-300">
              Onde lendas nascem e destinos são selados
            </p>
          </div>

          {/* Exemplo de duelo entre duas cartas */}
          <div className="flex justify-center items-center py-8">
            <BattleCardVs
              card1={
                monsters[0] || {
                  id: "placeholder1",
                  name: "Carregando...",
                  attack: 0,
                  defense: 0,
                  speed: 0,
                  hp: 0,
                  image_url: null,
                  created_at: new Date(),
                  updated_at: new Date(),
                }
              }
              card2={
                monsters[1] || {
                  id: "placeholder2",
                  name: "Carregando...",
                  attack: 0,
                  defense: 0,
                  speed: 0,
                  hp: 0,
                  image_url: null,
                  created_at: new Date(),
                  updated_at: new Date(),
                }
              }
            />
          </div>
        </div>
      </section>

      {/* Tournament Section - Mobile Optimized */}
      <section
        id="tournament"
        className="py-16 sm:py-24 px-4 sm:px-6 relative z-10"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-red-600 bg-clip-text text-transparent">
              TORNEIOS MÍSTICOS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: (
                  <TrophyOutlined className="text-3xl sm:text-4xl text-yellow-400" />
                ),
                title: "Campeonato Mundial",
                description: "Compete contra os melhores domadores do mundo",
                reward: "Monstros Exclusivos + 100,000 XP",
              },
              {
                icon: (
                  <CrownOutlined className="text-3xl sm:text-4xl text-purple-400" />
                ),
                title: "Torneio das Sombras",
                description: "Apenas os mais corajosos ousam participar",
                reward: "Título de Mestre das Sombras",
              },
              {
                icon: (
                  <FireOutlined className="text-3xl sm:text-4xl text-red-400" />
                ),
                title: "Arena do Dragão",
                description: "Desperte os poderes dos dragões ancestrais",
                reward: "Dragões Lendários + Raridades",
              },
              {
                icon: (
                  <ThunderboltOutlined className="text-3xl sm:text-4xl text-blue-400" />
                ),
                title: "Liga dos Elementos",
                description: "Domine todos os atributos elementais",
                reward: "Monstros Elementais Supremos",
              },
              {
                icon: (
                  <StarOutlined className="text-3xl sm:text-4xl text-green-400" />
                ),
                title: "Batalha dos Deuses",
                description: "Enfrente as criaturas mais poderosas",
                reward: "Monstros Divinos Ancestrais",
              },
              {
                icon: (
                  <GiftOutlined className="text-3xl sm:text-4xl text-pink-400" />
                ),
                title: "Evento Semanal",
                description: "Novos desafios toda semana",
                reward: "Pacotes Premium",
              },
            ].map((tournament, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                <div className="mb-3 sm:mb-4">{tournament.icon}</div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                  {tournament.title}
                </h4>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm">
                  {tournament.description}
                </p>
                <div className="bg-yellow-600/20 rounded-lg p-2 sm:p-3 border border-yellow-600/30">
                  <div className="text-xs text-yellow-400 font-semibold mb-1">
                    RECOMPENSA:
                  </div>
                  <div className="text-xs sm:text-sm text-white">
                    {tournament.reward}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-black via-purple-900/50 to-black relative z-10"
        data-aos="fade-up"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="text-4xl sm:text-6xl mb-4">𓁹</div>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
              SEU DESTINO AGUARDA
            </h3>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              Os monstros do destino foram invocados. O poder das trevas e da
              luz está em suas mãos. Você tem coragem para enfrentar a batalha
              suprema?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-yellow-600 to-red-600 border-none hover:from-yellow-700 hover:to-red-700 h-12 sm:h-16 lg:h-20 px-6 sm:px-8 lg:px-12 text-base sm:text-lg lg:text-xl shadow-2xl shadow-yellow-600/30"
              icon={<PlayCircleOutlined />}
              onClick={goToDashboard}
            >
              DESPERTAR O PODER
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer
        className="py-12 sm:py-16 px-4 sm:px-6 bg-black/80 relative z-10 border-t border-yellow-600/30"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div
              className="flex items-center space-x-4"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <GiDragonHead
                className="text-3xl sm:text-4xl text-yellow-500"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="200"
              />
              <span
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="300"
              >
                MONSTER ARENA
              </span>
            </div>

            <div
              className="text-gray-400 text-sm sm:text-base"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="400"
            >
              © {new Date().getFullYear()} Monster Arena. Todos os direitos
              reservados.
            </div>
          </div>
        </div>
      </footer>

      <FloatingActionButton />
    </div>
  );
};

export default LandingPage;
