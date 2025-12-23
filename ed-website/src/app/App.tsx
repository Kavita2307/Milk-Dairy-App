import Navbar from "../components/Navbar";
import Router from "./routes";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Router />
      </main>
    </>
  );
}
