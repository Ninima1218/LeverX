import { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { User } from "../../server/src/server-types";

type Props = {
  filter: any;
};

const EmployeeSection: React.FC<{ filter: any }> = ({ filter }) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Failed to load users", err));
  }, []);

  const filtered = employees.filter(emp =>
    Object.entries(filter).every(([key, val]) =>
      val ? String((emp as any)[key] || "").toLowerCase().includes(String(val).toLowerCase()) : true
    )
  );

  return (
    <section className="employee-section">
      <div className="employee-toolbar">
        <span className="employee-count">Employees: {filtered.length}</span>
        <div className="view-toogle">
          <button className={`view-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>
            <img src={require("../assets/icons/grid.svg")} alt="grid" />
          </button>
          <button className={`view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>
            <img src={require("../assets/icons/list.svg")} alt="list" />
          </button>
        </div>
      </div>

      {view === "list" && (
        <div className="employee-list-header">
          <span>Avatar</span>
          <span>Name</span>
          <span>Department</span>
          <span>Room</span>
        </div>
      )}

      <div className={`employee-cards-container ${view}-view`}>
        {filtered.map(emp => (
          <EmployeeCard
            key={emp._id}
            name={`${emp.first_name} ${emp.last_name}`}
            department={emp.department || ""}
            room={emp.room || ""}
            avatar={emp.user_avatar || ""}
          />
        ))}
      </div>
    </section>
  );
};


export default EmployeeSection;
