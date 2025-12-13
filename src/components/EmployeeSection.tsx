import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../server/src/server-types";

const EmployeeSection: React.FC<{
  users: User[];
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
}> = ({ users, view, setView }) => {
  const navigate = useNavigate();
  const onCardClick = (id: string | number) => navigate(`/users/${encodeURIComponent(String(id))}`);

  return (
    <section className={`employee-section ${view==="list"?"list-view":""}`}>
      <div className="employee-toolbar">
        <span className="employee-count">{users.length} employees displayed</span>
        <div className="view-toogle">
          <label className={`view-btn grid ${view==="grid"?"active":""}`} onClick={() => setView("grid")}>
            <img src="/assets/icons/squares.svg" alt="grid view icon" className="icon-grid" />
          </label>
          <label className={`view-btn list ${view==="list"?"active":""}`} onClick={() => setView("list")}>
            <img src="/assets/icons/list-view.svg" alt="list view icon" className="icon-list" />
          </label>
        </div>
      </div>

      <div className="employee-list-header">
        <span className="col-photo"><img src="/assets/icons/circle.svg" alt="circle-icon" className="col-icon" />Photo</span>
        <span className="col-name"><img src="/assets/icons/user.svg" alt="user-icon" className="col-icon" />Name</span>
        <span className="col-department"><img src="/assets/icons/bag.svg" alt="bag" className="col-icon" />Department</span>
        <span className="col-room"><img src="/assets/icons/door.svg" alt="door" className="col-icon" />Room</span>
      </div>

      <div className={`employee-cards-container ${view==="grid"?"grid-view":"list-view"}`}>
        {users.length === 0 ? (
          <div className="not-found-wrapper">
            <img src="/assets/images/not-found.webp" alt="Nothing found illustration" className="not-found-image" />
            <h2 className="not-found-title">Nothing found</h2>
            <p className="not-found-text">No result match your search.</p>
          </div>
        ) : (
          users.map(u => (
            <div key={u._id} className="employee-card" onClick={() => onCardClick(u._id)}>
              <img src={u.user_avatar || "/assets/avatars/profile-avatar.webp"} alt={u.first_name} className="employee-avatar" />
              <div className="employee-info">
                <span className="employee-name">{u.first_name} {u.last_name}</span>
                <div className="employee-details">
                  <span className="employee-position"><img src="/assets/icons/bag.svg" alt="bag-icon" /> {u.department ?? "-"}</span>
                  <span className="employee-room"><img src="/assets/icons/door.svg" alt="door-icon" /> {u.room ?? "-"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
export default EmployeeSection;
