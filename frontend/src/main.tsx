import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ItemProvider } from "./context/ItemContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ItemProvider>
        <App />
      </ItemProvider>
    </UserProvider>
  </StrictMode>,
);
