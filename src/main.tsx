import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { isHomePath } from "./lib/paths";
import "./index.css";

const container = document.getElementById("root")!;
const path = window.location.pathname;
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
);

// The home page is pre-rendered to HTML at build time; hydrate it instead of re-rendering
if (isHomePath(path) && container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
