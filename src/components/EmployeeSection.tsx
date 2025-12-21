import React, { useMemo } from "react";
import { useAppSelector } from "../store";
import EmployeeCard from "./EmployeeCard";
import { useGetUsersQuery } from "../store/usersApi";

const EmployeeSection: React.FC = () => {
  const { data: employees = [], isLoading, error } = useGetUsersQuery();
  const filter = useAppSelector(state => state.filter);
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();
      const searchName = (filter.name || "").toLowerCase();
      
      if (searchName && !fullName.includes(searchName)) return false;
      
      return Object.entries(filter).every(([key, value]) => {
        if (!value || key === "name") return true;

        const employeeValue = (emp as any)[key];
        if (employeeValue === undefined || employeeValue === null) return false;

        return String(employeeValue)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
    });
  }, [employees, filter]);

  if (isLoading) return <p>Loading employees...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <section className="employee-section">
      <div className="employee-toolbar">
        <span className="employee-count">
          {filteredEmployees.length} employees displayed
        </span>
        <div className="view-toggle">
          <button
            className={`view-btn ${view === "grid" ? "active" : ""}`}
            onClick={() => setView("grid")}
          >
            <img src={require("../assets/icons/grid.svg")} alt="grid" />
          </button>
          <button
            className={`view-btn ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            <img src={require("../assets/icons/list.svg")} alt="list" />
          </button>
        </div>
      </div>

      <div className={`employee-cards-container ${view}-view`}>
        {view === "list" && filteredEmployees.length > 0 && (
  <div className="employee-list-header">
    <div className="header-item">
      <img src={require("../assets/icons/circle.svg")} alt="" />
      <span>Photo</span>
    </div>
    <div className="header-item">
      <img src={require("../assets/icons/user.svg")} alt="" />
      <span>Name</span>
    </div>
    <div className="header-item">
      <img src={require("../assets/icons/bag.svg")} alt="" />
      <span>Department</span>
    </div>
    <div className="header-item">
      <img src={require("../assets/icons/door.svg")} alt="" />
      <span>Room</span>
    </div>
  </div>
)}

        {filteredEmployees.length === 0 ? (
          <div className="nothing-found">No employees match your search.</div>
        ) : (
          filteredEmployees.map(emp => (
            <EmployeeCard
              key={emp._id}
              id={emp._id}
              name={`${emp.first_name} ${emp.last_name}`}
              department={emp.department || ""}
              room={emp.room || ""}
              avatar={emp.user_avatar || ""}
              view={view} 
            />
          ))
        )}
      </div>
    </section>
  );
};

export default EmployeeSection;