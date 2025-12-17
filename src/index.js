import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./styles/global.scss";
createRoot(document.getElementById("root")).render(React.createElement(React.StrictMode, null,
    React.createElement(Provider, { store: store },
        React.createElement(BrowserRouter, null,
            React.createElement(App, null)))));
