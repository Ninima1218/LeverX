import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./styles/global.scss";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
