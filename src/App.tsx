import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import FullPortfolioPage from "./pages/FullPortfolioPage";

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen font-sans text-text-base transition-colors duration-300 bg-background-dark text-white">
        <Routes>
          <Route path="/" element={<FullPortfolioPage />} />
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center min-h-screen text-white text-xl">
                Page not found
              </div>
            }
          />
        </Routes>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </main>
    </BrowserRouter>
  );
}
