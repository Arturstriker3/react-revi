import React from "react";
import { Card, Row, Col, Typography, Button, Space, Statistic } from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  FireOutlined,
  CrownOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <Space style={{ marginBottom: "16px" }}>
          <Button icon={<ArrowLeftOutlined />} onClick={goBack} type="text">
            Voltar
          </Button>
        </Space>
        <Title level={2} style={{ margin: 0 }}>
          🏆 Dashboard - Monster Arena
        </Title>
        <Paragraph style={{ color: "#666", margin: 0 }}>
          Gerencie seus monstros, batalhas e progresso no jogo
        </Paragraph>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "32px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monstros Coletados"
              value={42}
              prefix={<FireOutlined style={{ color: "#ff4d4f" }} />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Batalhas Vencidas"
              value={156}
              prefix={<TrophyOutlined style={{ color: "#faad14" }} />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Nível Atual"
              value={15}
              prefix={<CrownOutlined style={{ color: "#722ed1" }} />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ranking Global"
              value={1}
              suffix="/ 10,000"
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Area */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title="📊 Estatísticas Recentes"
            extra={
              <Button type="primary" icon={<PlusOutlined />}>
                Nova Batalha
              </Button>
            }
          >
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Title level={4} style={{ color: "#666" }}>
                Área para Gráficos e Estatísticas
              </Title>
              <Paragraph>
                Aqui você pode adicionar gráficos de progresso, histórico de
                batalhas, e outras métricas importantes do jogo.
              </Paragraph>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="⚡ Ações Rápidas">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Button type="primary" block icon={<FireOutlined />} size="large">
                Iniciar Batalha
              </Button>
              <Button block icon={<TrophyOutlined />} size="large">
                Ver Torneios
              </Button>
              <Button block icon={<CrownOutlined />} size="large">
                Evoluir Monstros
              </Button>
              <Button block icon={<SettingOutlined />} size="large">
                Configurações
              </Button>
            </Space>
          </Card>

          <Card title="🏆 Ranking Semanal" style={{ marginTop: "16px" }}>
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Title level={4} style={{ color: "#666" }}>
                Top Players
              </Title>
              <Paragraph>Lista dos melhores jogadores da semana</Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bottom Section */}
      <Row gutter={[16, 16]} style={{ marginTop: "32px" }}>
        <Col xs={24}>
          <Card title="📈 Progresso do Jogo">
            <div style={{ textAlign: "center", padding: "40px" }}>
              <Title level={4} style={{ color: "#666" }}>
                Área para Progresso e Conquistas
              </Title>
              <Paragraph>
                Aqui você pode adicionar barras de progresso, conquistas
                desbloqueadas, e próximos objetivos do jogador.
              </Paragraph>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
