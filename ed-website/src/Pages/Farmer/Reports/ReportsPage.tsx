import { useNavigate } from "react-router-dom";
import "@/styles/reports.css";
import { MdOutlinePets, MdShoppingCart, MdOutlineNoFood } from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/authContext";

const menuItems = [
  {
    id: "0",
    title: "Daily Feed Efficiency",
    icon: <MdOutlinePets size={30} />,
    route: "/farmer/reports/daily-feed-efficiency",
  },
  {
    id: "1",
    title: "Dry Matter Intake",
    icon: <MdShoppingCart size={30} />,
    route: "/farmer/reports/dry-matter-intake",
  },
  {
    id: "2",
    title: "Milk Yield",
    icon: <MdOutlineNoFood size={30} />,
    route: "/farmer/reports/milk-yield",
  },
];

export default function ReportsPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth?.user) return null;
  const { user } = auth;

  return (
    <div className="reports-page">
      <h2 className="reports-title">Reports</h2>

      {menuItems.map((item) => (
        <div
          key={item.id}
          className="report-card"
          onClick={() => navigate(item.route, { state: { userId: user.id } })}
        >
          <div className="icon">{item.icon}</div>

          <span className="title">{item.title}</span>

          <FiChevronRight size={26} className="arrow" />
        </div>
      ))}
    </div>
  );
}
