import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import FullPortfolioPage from "./pages/FullPortfolioPage";
import { isHomePath } from "./lib/paths";

interface AppProps {
  path: string;
}

export default function App({ path }: AppProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen font-sans transition-colors duration-300 bg-background-dark text-white">
          {isHomePath(path) ? (
            <FullPortfolioPage />
          ) : (
            <main className="flex flex-col gap-4 justify-center items-center min-h-screen text-white text-xl">
              <p>Page not found</p>
              <a href="/" className="text-blue-400 hover:text-blue-300 text-base">Go to the home page</a>
            </main>
          )}
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
