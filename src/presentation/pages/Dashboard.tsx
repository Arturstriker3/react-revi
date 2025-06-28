import React from "react";
import { Card, Button, Statistic } from "antd";
import {
  UserOutlined,
  TrophyOutlined,
  FireOutlined,
  CrownOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Dashboard: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center sm:justify-start gap-2">
          <span role="img" aria-label="troféu">
            🏆
          </span>{" "}
          Dashboard - Monster Arena
        </h2>
        <p className="text-gray-500 mt-1">
          Gerencie seus monstros, batalhas e progresso no jogo
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <Statistic
            title="Monstros Coletados"
            value={42}
            prefix={<FireOutlined style={{ color: "#ff4d4f" }} />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
        <Card>
          <Statistic
            title="Batalhas Vencidas"
            value={156}
            prefix={<TrophyOutlined style={{ color: "#faad14" }} />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
        <Card>
          <Statistic
            title="Nível Atual"
            value={15}
            prefix={<CrownOutlined style={{ color: "#722ed1" }} />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
        <Card>
          <Statistic
            title="Ranking Global"
            value={1}
            suffix="/ 10,000"
            prefix={<UserOutlined style={{ color: "#1890ff" }} />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <Card
            title={
              <span className="font-semibold">📊 Estatísticas Recentes</span>
            }
            extra={
              <Button type="primary" icon={<PlusOutlined />}>
                Nova Batalha
              </Button>
            }
          >
            <div className="text-center py-10">
              <h4 className="text-lg font-semibold text-gray-600 mb-2">
                Área para Gráficos e Estatísticas
              </h4>
              <p className="text-gray-500">
                Aqui você pode adicionar gráficos de progresso, histórico de
                batalhas, e outras métricas importantes do jogo.
              </p>
            </div>
          </Card>
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-[340px]">
          <Card title={<span className="font-semibold">⚡ Ações Rápidas</span>}>
            <div className="flex flex-col gap-2">
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
            </div>
          </Card>
          <Card
            title={<span className="font-semibold">🏆 Ranking Semanal</span>}
          >
            <div className="text-center py-5">
              <h4 className="text-lg font-semibold text-gray-600 mb-2">
                Top Players
              </h4>
              <p className="text-gray-500">
                Lista dos melhores jogadores da semana
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8">
        <Card
          title={<span className="font-semibold">📈 Progresso do Jogo</span>}
        >
          <div className="text-center py-10">
            <h4 className="text-lg font-semibold text-gray-600 mb-2">
              Área para Progresso e Conquistas
            </h4>
            <p className="text-gray-500">
              Aqui você pode adicionar barras de progresso, conquistas
              desbloqueadas, e próximos objetivos do jogador.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
