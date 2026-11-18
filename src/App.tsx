import FullPortfolioPage from "./pages/FullPortfolioPage";
import { isHomePath } from "./lib/paths";

interface AppProps {
  path: string;
}

export default function App({ path }: AppProps) {
  return (
    <div className="min-h-screen font-sans text-text">
      {isHomePath(path) ? (
        <FullPortfolioPage />
      ) : (
        <main className="container-page flex min-h-screen flex-col justify-center gap-4">
          <p className="label">Error 404</p>
          <h1 className="font-display text-5xl font-semibold tracking-tight">Page not found</h1>
          <a href="/" className="text-link w-fit">
            Go to the home page
          </a>
        </main>
      )}
    </div>
  );
}
