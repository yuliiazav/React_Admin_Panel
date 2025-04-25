import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/resets.css";
import "../styles/main.css";
import App from "./App.jsx";

import React from "react";
import store from "../store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
