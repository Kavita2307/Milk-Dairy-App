import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/authContext";
import "./components/chartSetup";
import "@/styles/design-system.css";
import "@/styles/ui.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
