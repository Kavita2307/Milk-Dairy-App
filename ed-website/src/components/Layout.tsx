import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/layout.css";

export default function Layout({ children }: any) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-content">
        <Navbar />
        <main className="page-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
