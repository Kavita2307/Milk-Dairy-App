import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { MdPets } from "react-icons/md";
import "@/styles/reports.css";

export default function MilkYieldMenu() {
  const navigate = useNavigate();

  return (
    <div className="reports-page">
      <h2>Milk Yield</h2>

      <div className="report-card" onClick={() => navigate("cow-wise")}>
        <MdPets size={28} />
        <span className="title">Cow Wise</span>
        <FiChevronRight size={22} />
      </div>

      <div className="report-card" onClick={() => navigate("group-wise")}>
        <MdPets size={28} />
        <span className="title">Milking Group Wise</span>
        <FiChevronRight size={22} />
      </div>
    </div>
  );
}
