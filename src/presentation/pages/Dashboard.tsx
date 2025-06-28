import React from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Typography,
  Space,
  List,
  Avatar,
  Tag,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const recentTasks = [
    {
      id: "1",
      title: "Implementar autenticação",
      status: "completed",
      assignee: "João Silva",
      priority: "high",
    },
    {
      id: "2",
      title: "Criar dashboard",
      status: "in-progress",
      assignee: "Maria Santos",
      priority: "medium",
    },
    {
      id: "3",
      title: "Testes unitários",
      status: "pending",
      assignee: "Pedro Costa",
      priority: "low",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "pending":
        return "orange";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "in-progress":
        return "Em andamento";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Média";
      case "low":
        return "Baixa";
      default:
        return priority;
    }
  };

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Text type="secondary">Visão geral do projeto e estatísticas</Text>

      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total de Tarefas"
              value={25}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Concluídas"
              value={15}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Em Andamento"
              value={7}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pendentes"
              value={3}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} lg={12}>
          <Card title="Progresso Geral" extra={<CalendarOutlined />}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text>Completude do Projeto</Text>
                <Progress percent={60} status="active" />
              </div>
              <div>
                <Text>Qualidade do Código</Text>
                <Progress percent={85} />
              </div>
              <div>
                <Text>Testes</Text>
                <Progress percent={45} status="exception" />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Tarefas Recentes" extra={<FileTextOutlined />}>
            <List
              dataSource={recentTasks}
              renderItem={(task) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={
                      <Space>
                        <Text strong>{task.title}</Text>
                        <Tag color={getStatusColor(task.status)}>
                          {getStatusText(task.status)}
                        </Tag>
                        <Tag color={getPriorityColor(task.priority)}>
                          {getPriorityText(task.priority)}
                        </Tag>
                      </Space>
                    }
                    description={`Responsável: ${task.assignee}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <Card title="Atividade Recente">
            <List
              dataSource={[
                'João Silva concluiu a tarefa "Implementar login"',
                'Maria Santos iniciou a tarefa "Criar dashboard"',
                'Pedro Costa comentou na tarefa "Testes unitários"',
                "Sistema criou backup automático",
                "Nova versão foi deployada em produção",
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Text>{item}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
