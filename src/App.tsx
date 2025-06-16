import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <main className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-text-base transition-colors duration-300">
        <AppRouter />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </main>
    </BrowserRouter>
  );
}

export default App;