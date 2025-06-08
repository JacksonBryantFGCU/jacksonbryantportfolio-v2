import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <main className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-text-base transition-colors duration-300">
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
