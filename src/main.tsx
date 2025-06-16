import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

// Clerk appearance customization
const clerkAppearance = {
  baseTheme: dark,
  elements: {
    card: "bg-neutral-900 text-white border-neutral-700",
    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    formFieldInput: "bg-neutral-800 text-white border border-neutral-700",
    headerTitle: "text-white",
    headerSubtitle: "text-gray-400",
    footerActionText: "text-gray-400",
    footerActionLink: "text-blue-400 hover:text-blue-500",
  },
};

// Create a single instance of QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      appearance={clerkAppearance}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);