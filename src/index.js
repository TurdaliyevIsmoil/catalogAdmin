import React from "react";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { DataProvider } from "./contexts/DataContext";

const container = document.getElementById("root");
const root = createRoot(container);
fetch("https://api.mi-print.uz/api/v1/subcatalog/list");
root.render(
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);
