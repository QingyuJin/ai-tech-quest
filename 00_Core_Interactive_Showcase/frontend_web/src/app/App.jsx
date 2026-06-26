import { BrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import AppRoutes from "./routes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}
