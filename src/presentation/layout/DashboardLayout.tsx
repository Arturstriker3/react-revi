import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown, Space, Modal } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { routes } from "../routes/router";
import { GiDragonHead, GiSwordsPower } from "react-icons/gi";
import { useAppStore } from "../stores/appStore";

const { Header, Content } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: MenuItem[];
}

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clearDataModalOpen, setClearDataModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);
  const clearAppData = useAppStore((state) => state.clearAppData);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dashboardRoute = routes.find((r) => r.path === "/dashboard");
  const menuItems: MenuItem[] = (dashboardRoute?.children || [])
    .filter((child) => child.path !== "")
    .map((child) => ({
      key: `/dashboard/${child.path}`,
      icon:
        (child as any).title === "Monstros" ? (
          <GiDragonHead className="text-xl" />
        ) : (child as any).title === "Batalhar" ? (
          <GiSwordsPower className="text-xl" />
        ) : null,
      label: collapsed ? undefined : (child as any).title,
    }));

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setMobileOpen(false);
  };

  const userMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sair",
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      navigate("/");
    }
  };

  const getSelectedKeys = () => {
    const path = location.pathname;
    const selectedKey =
      menuItems.find((item) => item.key === path)?.key || "/dashboard";
    return [selectedKey];
  };

  const currentMenu = menuItems.find((item) => item.key === location.pathname);
  const currentTitle = currentMenu?.label || "";

  const handleClearData = () => {
    clearAppData();
    setClearDataModalOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#f5f6f7]">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 bg-[#061529] flex flex-col transition-all duration-200
          w-screen sm:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          boxShadow: mobileOpen ? "2px 0 8px rgba(0,0,0,0.15)" : undefined,
        }}
      >
        <div className="border-b border-[#303030] flex items-center justify-center py-4 px-2 relative">
          <span className="block w-full text-center text-[22px] text-white font-bold tracking-wide whitespace-nowrap transition-all duration-200">
            Monster Arena
          </span>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 text-white bg-[#061529] rounded-full text-3xl"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            ×
          </button>
        </div>
        <div className="flex-1 flex flex-col">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
            onClick={handleMenuClick}
            className="flex-1 bg-transparent border-0"
            style={{ marginTop: 16 }}
          />
        </div>
        <div className="flex flex-col mt-auto mb-6">
          <button
            className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors w-full py-2 px-6 text-base font-normal outline-none border-none bg-transparent text-left"
            onClick={() => setClearDataModalOpen(true)}
          >
            <DeleteOutlined className="text-lg" />
            <span>Limpar Dados</span>
          </button>
          <button
            className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors w-full py-2 px-6 text-base font-normal outline-none border-none bg-transparent text-left"
            onClick={() => {
              navigate("/");
              setMobileOpen(false);
            }}
          >
            <LogoutOutlined className="text-lg" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
      <aside
        className={`
          hidden sm:flex flex-col fixed top-0 left-0 h-screen z-50 bg-[#061529] transition-all duration-200
          ${collapsed ? "w-[80px]" : "w-[250px]"}
        `}
      >
        <div className="border-b border-[#303030] flex items-center justify-center py-4 px-2 relative">
          <span
            className={`block w-full text-center ${
              collapsed ? "text-[18px]" : "text-[22px]"
            } text-white font-bold tracking-wide whitespace-nowrap transition-all duration-200`}
          >
            {collapsed ? "MA" : "Monster Arena"}
          </span>
        </div>
        <div className="flex-1 flex flex-col">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
            onClick={handleMenuClick}
            className="flex-1 bg-transparent border-0"
            style={{ marginTop: 16 }}
          />
        </div>
        <div className="flex flex-col mt-auto mb-6">
          <button
            className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors w-full py-2 px-6 text-base font-normal outline-none border-none bg-transparent text-left"
            onClick={() => setClearDataModalOpen(true)}
          >
            <DeleteOutlined className="text-lg" />
            {!collapsed && <span>Limpar Dados</span>}
          </button>
          <button
            className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors w-full py-2 px-6 text-base font-normal outline-none border-none bg-transparent text-left"
            onClick={() => navigate("/")}
          >
            <LogoutOutlined className="text-lg" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>
      <div
        className="flex-1 flex flex-col transition-all duration-200 min-h-screen"
        style={{ marginLeft: isDesktop ? (collapsed ? 80 : 250) : 0 }}
      >
        <Layout style={{ background: "transparent" }}>
          <Header className="sticky top-0 z-40 bg-white px-6 py-0 flex items-center justify-between shadow">
            <div className="flex items-center">
              <button
                className="sm:hidden flex items-center justify-center w-10 h-10 text-[#061529] bg-white rounded-full mr-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menu"
              >
                <MenuUnfoldOutlined className="text-2xl" />
              </button>
              <button
                className="hidden sm:flex items-center justify-center w-10 h-10 text-[#061529] bg-white rounded-full mr-2"
                onClick={() => setCollapsed(!collapsed)}
                aria-label="Colapsar menu"
                style={{ background: "none", border: "none" }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button>
              <span className="font-bold text-lg ml-2">{currentTitle}</span>
            </div>
            <div className="hidden sm:flex">
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: handleUserMenuClick,
                }}
                placement="bottomRight"
              >
                <Space style={{ cursor: "pointer" }}>
                  <Avatar icon={<UserOutlined />} />
                  <span>Jogador</span>
                </Space>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: 0,
              padding: 0,
              background: "#fff",
              borderRadius: "8px",
              minHeight: "calc(100vh - 112px)",
            }}
          >
            <div className="w-full px-4 py-2">
              <Outlet context={{ mobileOpen }} />
            </div>
          </Content>
        </Layout>
      </div>

      <Modal
        title="Limpar Dados"
        open={clearDataModalOpen}
        onOk={handleClearData}
        onCancel={() => setClearDataModalOpen(false)}
        okText="Sim, limpar"
        cancelText="Cancelar"
        okButtonProps={{
          className: "bg-red-500 hover:bg-red-600",
          danger: true,
        }}
      >
        <p>
          Tem certeza que deseja limpar todos os dados do aplicativo? Esta ação
          não pode ser desfeita.
        </p>
      </Modal>
    </div>
  );
};

export default DashboardLayout;
