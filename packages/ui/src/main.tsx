import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="teal" grayColor="slate" appearance="dark" radius="medium" scaling="100%">
      <App />
    </Theme>
  </StrictMode>,
);
