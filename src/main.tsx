import React from "react";
import ReactDOM from "react-dom/client";
import App from "./presentation/App.tsx";
import "antd/dist/reset.css";
import "./presentation/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
