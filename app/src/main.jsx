import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./root.jsx";
import "./main.css";
import { StoreProvider } from "./store.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Root />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
