import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AntdConfigProvider } from "./config/antdConfig";
import TaskManager from "./pages/TaskManager";
import Dashboard from "./pages/Dashboard";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/tasks",
      icon: <UserOutlined />,
      label: <Link to="/tasks">Gerenciador de Tarefas</Link>,
    },
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
  ];

  return (
    <AntdConfigProvider>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={250} theme="dark">
            <div style={{ padding: "16px", textAlign: "center" }}>
              <Title level={4} style={{ color: "white", margin: 0 }}>
                React App
              </Title>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["/"]}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: "0 24px" }}>
              <Title level={3} style={{ margin: "16px 0" }}>
                Aplicação React com Ant Design
              </Title>
            </Header>
            <Content
              style={{
                margin: "24px",
                padding: "24px",
                background: "#fff",
                borderRadius: "8px",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<TaskManager />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </AntdConfigProvider>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <Title level={2}>Bem-vindo ao React App</Title>
      <p>Esta é uma aplicação React construída com:</p>
      <ul>
        <li>TypeScript</li>
        <li>Ant Design para componentes</li>
        <li>React Router para navegação</li>
        <li>Zustand para gerenciamento de estado</li>
        <li>Clean Architecture</li>
      </ul>
      <p>Use o menu lateral para navegar entre as diferentes páginas.</p>
    </div>
  );
};

export default App;
