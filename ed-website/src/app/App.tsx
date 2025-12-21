import Sidebar from "../components/Sidebar";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ padding: 24, flex: 1 }}>
        <AppRoutes />
      </main>
    </div>
  );
}
