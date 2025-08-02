import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { HospitalProvider } from "./providers/HospitalProvider";
import { DrAdminProvider } from "./providers/DrAdminProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DrAdminProvider>
        <HospitalProvider>
          <App />
        </HospitalProvider>
      </DrAdminProvider>
    </BrowserRouter>
  </StrictMode>
);
