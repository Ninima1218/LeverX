import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import EmployeeSection from "../components/EmployeeSection";
import { User } from "../../server/src/server-types";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<any>({}); 
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetch("/api/employees").then(r => r.json()).then(setUsers).catch(() => setUsers([]));
  }, []);

  const filtered = useMemo(() => {
    const norm = (s?: string) => (s || "").trim().toLowerCase();
    const nameQ = norm(filters.name);
    const emailQ = norm(filters.email);
    const phoneQ = norm(filters.phone);
    const tgQ = norm(filters.telegram);
    const buildingQ = norm(filters.building);
    const roomQ = norm(filters.room);
    const deptQ = norm(filters.department);
    const hasAny = nameQ || emailQ || phoneQ || tgQ || buildingQ || roomQ || deptQ;
    if (!hasAny) return users;
    return users.filter(u => {
      const full = norm(`${u.first_name} ${u.last_name}`);
      return (!nameQ || full.includes(nameQ))
        && (!emailQ || norm(u.email).includes(emailQ))
        && (!phoneQ || norm(u.phone).includes(phoneQ))
        && (!tgQ || norm(u.telegram).includes(tgQ))
        && (!buildingQ || norm(u.building).includes(buildingQ))
        && (!roomQ || norm(u.room).includes(roomQ))
        && (!deptQ || norm(u.department).includes(deptQ));
    });
  }, [users, filters]);

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <SearchPanel onChange={setFilters} />
          <EmployeeSection users={filtered} view={view} setView={setView} />
        </div>
      </main>
    </>
  );
};
export default Home;
