import { BrowserRouter } from "react-router-dom";
import AppShell from "./components/layout/AppShell.jsx";
import AppRouter from "./routes/AppRouter.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AppRouter />
      </AppShell>
    </BrowserRouter>
  );
}
