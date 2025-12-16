import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { useGetUsersQuery } from "../store/usersApi";
import { useAppSelector } from "../store";

const EmployeeSection: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

  const { data: employees = [], isLoading, error } = useGetUsersQuery();
  const filter = useAppSelector(state => state.filter);

  const filtered = employees.filter(emp =>
    Object.entries(filter).every(([key, val]) => {
      if (!val) return true;
      const field = (emp as any)[key];
      return field && String(field).toLowerCase().includes(String(val).toLowerCase());
    })
  );

  if (isLoading) return <p>Loading employees...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <section className="employee-section">
      <div className="employee-toolbar">
        <span className="employee-count">Employees: {filtered.length}</span>
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

      {view === "list" && (
        <div className="employee-list-header">
          <span>Avatar</span>
          <span>Name</span>
          <span>Department</span>
          <span>Room</span>
        </div>
      )}

      <div className={`employee-cards-container ${view}-view`}>
        {filtered.length === 0 ? (
          <div className="nothing-found">
            <div className="title">Nothing found</div>
            <div className="desc">
              No result match your search. Try different request.
            </div>
          </div>
        ) : (
          filtered.map(emp => (
            <EmployeeCard
              key={emp._id}
              name={`${emp.first_name} ${emp.last_name}`}
              department={emp.department || ""}
              room={emp.room || ""}
              avatar={emp.user_avatar || ""}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default EmployeeSection;
