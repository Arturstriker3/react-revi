import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import React from "react";

export const antdConfig = {
  locale: ptBR,
  theme: {
    token: {
      colorPrimary: "#1890ff",
      borderRadius: 6,
    },
  },
};

export const AntdConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ConfigProvider {...antdConfig}>{children}</ConfigProvider>;
};
