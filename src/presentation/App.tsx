import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AntdConfigProvider } from "./config/antdConfig";
import { routes } from "./routes/router";

const App: React.FC = () => {
  const renderRoutes = (routes: any[]): React.ReactNode => {
    return routes.map((route) => {
      if (route.children) {
        return (
          <Route key={route.path} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );
    });
  };

  return (
    <AntdConfigProvider>
      <Router>
        <Routes>{renderRoutes(routes)}</Routes>
      </Router>
    </AntdConfigProvider>
  );
};

export default App;
