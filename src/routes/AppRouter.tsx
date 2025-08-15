import { Routes, Route } from "react-router-dom";
import FullPortfolioPage from "../pages/FullPortfolioPage";

export default function AppRouter() {
  return (
    <div className="bg-background-dark min-h-screen text-white">
      <Routes>
        {/* Full Portfolio Single Page */}
        <Route path="/" element={<FullPortfolioPage />} />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center min-h-screen text-white text-xl">
              Page not found
            </div>
          }
        />
      </Routes>
    </div>
  );
}
