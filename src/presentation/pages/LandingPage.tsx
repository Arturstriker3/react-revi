import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Progress,
  Badge,
  Typography,
  Row,
  Col,
  Space,
  Divider,
} from "antd";
import {
  PlayCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  ScissorOutlined,
  StarOutlined,
  RocketOutlined,
  CrownOutlined,
  BugOutlined,
  EyeOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

interface Monster {
  id: number;
  name: string;
  type: string;
  attack: number;
  defense: number;
  health: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  element: string;
  image: string;
  description: string;
}

const monsters: Monster[] = [
  {
    id: 1,
    name: "Dragão Flamejante",
    type: "Dragão",
    attack: 95,
    defense: 80,
    health: 120,
    rarity: "legendary",
    element: "Fogo",
    image: "https://via.placeholder.com/200x200/ff6b6b/ffffff?text=Dragon",
    description: "Um dragão ancestral que domina as chamas eternas",
  },
  {
    id: 2,
    name: "Lobo Sombrio",
    type: "Besta",
    attack: 75,
    defense: 60,
    health: 90,
    rarity: "epic",
    element: "Sombra",
    image: "https://via.placeholder.com/200x200/6c5ce7/ffffff?text=Wolf",
    description: "Predador das trevas com velocidade sobrenatural",
  },
  {
    id: 3,
    name: "Golem de Cristal",
    type: "Elemental",
    attack: 60,
    defense: 95,
    health: 110,
    rarity: "rare",
    element: "Terra",
    image: "https://via.placeholder.com/200x200/00b894/ffffff?text=Golem",
    description: "Guardião de cristal com defesa impenetrável",
  },
];

const rarityColors = {
  common: "#9ca3af",
  rare: "#3b82f6",
  epic: "#8b5cf6",
  legendary: "#f59e0b",
};

const rarityNames = {
  common: "COMUM",
  rare: "RARO",
  epic: "ÉPICO",
  legendary: "LENDÁRIO",
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [battleAnimation, setBattleAnimation] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % monsters.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const startBattle = () => {
    setBattleAnimation(true);
    setTimeout(() => setBattleAnimation(false), 2000);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const stats = [
    { label: "Monstros Únicos", value: "500+", icon: <BugOutlined /> },
    { label: "Jogadores Ativos", value: "10K+", icon: <TrophyOutlined /> },
    { label: "Batalhas Diárias", value: "50K+", icon: <ScissorOutlined /> },
    { label: "Elementos", value: "12", icon: <FireOutlined /> },
  ];

  const features = [
    {
      icon: <BugOutlined className="text-3xl" style={{ color: "#8b5cf6" }} />,
      title: "500+ Monstros Únicos",
      description: "Colete criaturas de diferentes elementos e raridades",
    },
    {
      icon: (
        <ScissorOutlined className="text-3xl" style={{ color: "#ef4444" }} />
      ),
      title: "Batalhas Estratégicas",
      description: "Sistema de combate baseado em turnos e habilidades",
    },
    {
      icon: (
        <TrophyOutlined className="text-3xl" style={{ color: "#f59e0b" }} />
      ),
      title: "Torneios Épicos",
      description: "Participe de competições e ganhe recompensas exclusivas",
    },
    {
      icon: <StarOutlined className="text-3xl" style={{ color: "#3b82f6" }} />,
      title: "Evolução de Monstros",
      description: "Aprimore seus monstros e desbloqueie novas habilidades",
    },
    {
      icon: <FireOutlined className="text-3xl" style={{ color: "#f97316" }} />,
      title: "12 Elementos Diferentes",
      description: "Domine as vantagens e desvantagens elementais",
    },
    {
      icon: <CrownOutlined className="text-3xl" style={{ color: "#f59e0b" }} />,
      title: "Rankings Globais",
      description: "Compete com jogadores do mundo todo",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 50%, #312e81 100%)",
        color: "white",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 40,
            width: 8,
            height: 8,
            backgroundColor: "#fbbf24",
            borderRadius: "50%",
            animation: "pulse 2s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: 160,
            right: 80,
            width: 4,
            height: 4,
            backgroundColor: "#60a5fa",
            borderRadius: "50%",
            animation: "ping 1s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: "25%",
            width: 12,
            height: 12,
            backgroundColor: "#a78bfa",
            borderRadius: "50%",
            animation: "bounce 2s infinite",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "33%",
            right: "33%",
            width: 8,
            height: 8,
            backgroundColor: "#34d399",
            borderRadius: "50%",
            animation: "pulse 3s infinite",
          }}
        ></div>
      </div>

      {/* Header */}
      <header
        style={{
          position: "relative",
          zIndex: 10,
          padding: "24px",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(45deg, #fbbf24, #ef4444)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CrownOutlined style={{ fontSize: 20, color: "white" }} />
            </div>
            <Title
              level={3}
              style={{
                margin: 0,
                background: "linear-gradient(45deg, #fbbf24, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MonsterArena
            </Title>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <a
              href="#monsters"
              style={{
                color: "white",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              Monstros
            </a>
            <a
              href="#battle"
              style={{
                color: "white",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              Batalha
            </a>
            <a
              href="#features"
              style={{
                color: "white",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fbbf24")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              Features
            </a>
            <Button
              type="text"
              style={{
                color: "white",
                borderColor: "white",
                border: "1px solid white",
              }}
              icon={<DashboardOutlined />}
              onClick={goToDashboard}
            >
              Dashboard
            </Button>
          </div>
          <Button
            type="primary"
            size="large"
            style={{
              background: "linear-gradient(45deg, #fbbf24, #ef4444)",
              border: "none",
              height: 40,
            }}
            icon={<PlayCircleOutlined />}
            onClick={goToDashboard}
          >
            Jogar Agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}
        >
          <div style={{ marginBottom: 32 }}>
            <Badge.Ribbon text="BETA" color="gold">
              <Title
                level={1}
                style={{
                  fontSize: "4rem",
                  marginBottom: 24,
                  background:
                    "linear-gradient(45deg, #fbbf24, #ef4444, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "pulse 2s infinite",
                }}
              >
                MONSTER ARENA
              </Title>
            </Badge.Ribbon>
          </div>

          <Paragraph
            style={{
              fontSize: "1.5rem",
              marginBottom: 32,
              color: "#d1d5db",
              maxWidth: "768px",
              margin: "0 auto 32px",
            }}
          >
            Entre no mundo épico das batalhas de monstros! Colete criaturas
            lendárias, desenvolva estratégias únicas e torne-se o campeão
            supremo da arena!
          </Paragraph>

          <Space size="large" style={{ marginBottom: 48 }}>
            <Button
              type="primary"
              size="large"
              style={{
                background: "linear-gradient(45deg, #10b981, #3b82f6)",
                border: "none",
                height: 56,
                padding: "0 32px",
                fontSize: "1.125rem",
              }}
              icon={<RocketOutlined />}
              onClick={goToDashboard}
            >
              Começar Aventura
            </Button>
            <Button
              size="large"
              style={{
                borderColor: "#fbbf24",
                color: "#fbbf24",
                height: 56,
                padding: "0 32px",
                fontSize: "1.125rem",
              }}
              icon={<DashboardOutlined />}
              onClick={goToDashboard}
            >
              Acessar Dashboard
            </Button>
          </Space>

          {/* Stats Counter */}
          <Row gutter={24} style={{ maxWidth: "1024px", margin: "0 auto" }}>
            {stats.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <div
                  style={{
                    textAlign: "center",
                    padding: 16,
                    borderRadius: 8,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      color: "#fbbf24",
                      marginBottom: 8,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#d1d5db" }}>
                    {stat.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Monster Showcase */}
      <section
        id="monsters"
        style={{ padding: "80px 24px", position: "relative", zIndex: 10 }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Title
              level={2}
              style={{
                fontSize: "3rem",
                marginBottom: 16,
                background: "linear-gradient(45deg, #60a5fa, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Conheça os Monstros
            </Title>
            <Paragraph style={{ fontSize: "1.25rem", color: "#d1d5db" }}>
              Cada criatura possui habilidades únicas e estatísticas especiais
            </Paragraph>
          </div>

          <Row gutter={32}>
            {monsters.map((monster) => (
              <Col xs={24} md={8} key={monster.id}>
                <Card
                  style={{
                    background: "linear-gradient(135deg, #1f2937, #111827)",
                    border: `2px solid ${rarityColors[monster.rarity]}`,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    transform: "translateY(0)",
                    boxShadow: `0 0 20px ${rarityColors[monster.rarity]}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 8px 32px ${
                      rarityColors[monster.rarity]
                    }60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 0 20px ${
                      rarityColors[monster.rarity]
                    }40`;
                  }}
                  onClick={() => setSelectedMonster(monster)}
                  cover={
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={monster.image}
                        alt={monster.name}
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          padding: "4px 8px",
                          borderRadius: "16px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          color: "white",
                          backgroundColor: rarityColors[monster.rarity],
                        }}
                      >
                        {rarityNames[monster.rarity]}
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 8,
                          left: 8,
                          backgroundColor: "rgba(0,0,0,0.7)",
                          padding: "4px 8px",
                          borderRadius: 4,
                          fontSize: "0.75rem",
                        }}
                      >
                        {monster.element}
                      </div>
                    </div>
                  }
                >
                  <div style={{ color: "white" }}>
                    <Title
                      level={4}
                      style={{ color: "#fbbf24", marginBottom: 8 }}
                    >
                      {monster.name}
                    </Title>
                    <Paragraph
                      style={{
                        color: "#d1d5db",
                        fontSize: "0.875rem",
                        marginBottom: 16,
                      }}
                    >
                      {monster.description}
                    </Paragraph>

                    <Space
                      direction="vertical"
                      style={{ width: "100%" }}
                      size="small"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <ScissorOutlined style={{ color: "#ef4444" }} />
                          Ataque
                        </span>
                        <Progress
                          percent={monster.attack}
                          size="small"
                          strokeColor="#ef4444"
                          showInfo={false}
                          style={{ width: 80 }}
                        />
                        <span style={{ color: "#ef4444", fontWeight: "bold" }}>
                          {monster.attack}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <SafetyOutlined style={{ color: "#3b82f6" }} />
                          Defesa
                        </span>
                        <Progress
                          percent={monster.defense}
                          size="small"
                          strokeColor="#3b82f6"
                          showInfo={false}
                          style={{ width: 80 }}
                        />
                        <span style={{ color: "#3b82f6", fontWeight: "bold" }}>
                          {monster.defense}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <ThunderboltOutlined style={{ color: "#10b981" }} />
                          Vida
                        </span>
                        <Progress
                          percent={monster.health}
                          size="small"
                          strokeColor="#10b981"
                          showInfo={false}
                          style={{ width: 80 }}
                        />
                        <span style={{ color: "#10b981", fontWeight: "bold" }}>
                          {monster.health}
                        </span>
                      </div>
                    </Space>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Battle Preview */}
      <section
        id="battle"
        style={{
          padding: "80px 24px",
          backgroundColor: "rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Title
              level={2}
              style={{
                fontSize: "3rem",
                marginBottom: 16,
                background: "linear-gradient(45deg, #f87171, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Arena de Batalha
            </Title>
            <Paragraph style={{ fontSize: "1.25rem", color: "#d1d5db" }}>
              Estratégia, timing e sorte determinam o vencedor
            </Paragraph>
          </div>

          <div
            style={{
              background:
                "linear-gradient(45deg, rgba(127,29,29,0.5), rgba(30,58,138,0.5))",
              borderRadius: 16,
              padding: 32,
              backdropFilter: "blur(8px)",
              border: "1px solid #374151",
            }}
          >
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 32 }}
            >
              <Col span={8} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 96,
                    height: 96,
                    backgroundColor: "#ef4444",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <FireOutlined style={{ fontSize: "2rem", color: "white" }} />
                </div>
                <Title level={4} style={{ color: "#ef4444", marginBottom: 4 }}>
                  Dragão Flamejante
                </Title>
                <Text style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                  ATK: 95 | DEF: 80
                </Text>
              </Col>

              <Col span={8} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "3rem",
                    animation: battleAnimation
                      ? "bounce 0.5s infinite"
                      : "none",
                  }}
                >
                  ⚔️
                </div>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginTop: 16,
                    background: "linear-gradient(45deg, #fbbf24, #ef4444)",
                    border: "none",
                  }}
                  onClick={startBattle}
                  loading={battleAnimation}
                >
                  {battleAnimation ? "Batalha!" : "Iniciar Batalha"}
                </Button>
              </Col>

              <Col span={8} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 96,
                    height: 96,
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <SafetyOutlined
                    style={{ fontSize: "2rem", color: "white" }}
                  />
                </div>
                <Title level={4} style={{ color: "#3b82f6", marginBottom: 4 }}>
                  Golem de Cristal
                </Title>
                <Text style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                  ATK: 60 | DEF: 95
                </Text>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <StarOutlined
                    style={{
                      fontSize: "1.5rem",
                      color: "#fbbf24",
                      marginBottom: 8,
                    }}
                  />
                  <Title level={5} style={{ color: "white", marginBottom: 8 }}>
                    Sistema de Turnos
                  </Title>
                  <Text style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                    Planeje cada movimento estrategicamente
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <ThunderboltOutlined
                    style={{
                      fontSize: "1.5rem",
                      color: "#8b5cf6",
                      marginBottom: 8,
                    }}
                  />
                  <Title level={5} style={{ color: "white", marginBottom: 8 }}>
                    Habilidades Especiais
                  </Title>
                  <Text style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                    Cada monstro possui ataques únicos
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    padding: 16,
                    textAlign: "center",
                  }}
                >
                  <TrophyOutlined
                    style={{
                      fontSize: "1.5rem",
                      color: "#10b981",
                      marginBottom: 8,
                    }}
                  />
                  <Title level={5} style={{ color: "white", marginBottom: 8 }}>
                    Recompensas Épicas
                  </Title>
                  <Text style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
                    Ganhe novos monstros e itens raros
                  </Text>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{ padding: "80px 24px", position: "relative", zIndex: 10 }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Title
              level={2}
              style={{
                fontSize: "3rem",
                marginBottom: 16,
                background: "linear-gradient(45deg, #34d399, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Recursos do Jogo
            </Title>
          </div>

          <Row gutter={32}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 12,
                    padding: 24,
                    transition: "all 0.3s",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.2)";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                  <Title level={4} style={{ color: "white", marginBottom: 8 }}>
                    {feature.title}
                  </Title>
                  <Text style={{ color: "#d1d5db" }}>
                    {feature.description}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "80px 24px",
          background: "linear-gradient(45deg, #1e1b4b, #1e3a8a)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{ maxWidth: "1024px", margin: "0 auto", textAlign: "center" }}
        >
          <Title
            level={2}
            style={{ fontSize: "3rem", marginBottom: 24, color: "white" }}
          >
            Pronto para a Batalha?
          </Title>
          <Paragraph
            style={{ fontSize: "1.25rem", color: "#d1d5db", marginBottom: 32 }}
          >
            Junte-se a milhares de treinadores e prove que você é o melhor!
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              style={{
                background: "linear-gradient(45deg, #10b981, #3b82f6)",
                border: "none",
                height: 64,
                padding: "0 48px",
                fontSize: "1.25rem",
              }}
              icon={<PlayCircleOutlined />}
              onClick={goToDashboard}
            >
              Jogar Gratuitamente
            </Button>
            <Button
              size="large"
              style={{
                borderColor: "#fbbf24",
                color: "#fbbf24",
                height: 64,
                padding: "0 48px",
                fontSize: "1.25rem",
              }}
              icon={<DashboardOutlined />}
              onClick={goToDashboard}
            >
              Acessar Dashboard
            </Button>
          </Space>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "48px 24px",
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(45deg, #fbbf24, #ef4444)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CrownOutlined style={{ color: "white" }} />
              </div>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #fbbf24, #ef4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MonsterArena
              </span>
            </div>
            <div style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
              © 2024 MonsterArena. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
