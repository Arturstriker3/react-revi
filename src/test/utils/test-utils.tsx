import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";

// Wrapper customizado para testes
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider locale={ptBR}>
      <BrowserRouter>{children}</BrowserRouter>
    </ConfigProvider>
  );
};

// Render customizado com providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
