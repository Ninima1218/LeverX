import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { User } from "../../server/src/server-types";

const canEditByRole = (current: User | null, target: User | null) => {
  if (!current || !target) return false;
  if (current.role === "Admin") return current._id !== target._id;
  if (current.role === "HR") {
    const mgrId = target.manager?.id ?? target.manager_id;
    return current._id !== target._id && String(mgrId) === String(current._id);
  }
  return false;
};

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [current, setCurrent] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (auth.userId) fetch(`/api/users/${auth.userId}`).then(r=>r.json()).then(setCurrent).catch(()=>setCurrent(null));
  }, [auth.userId]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/users/${id}`).then(r => r.json()).then(setUser).catch(()=>setUser(null));
  }, [id]);

  const canEdit = useMemo(() => canEditByRole(current, user), [current, user]);

  const save = async () => {
    if (!user) return;
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      telegram: user.telegram,
      citizenship: user.citizenship,
      department: user.department,
      building: user.building,
      room: user.room,
      desk_number: user.desk_number
    };
    await fetch(`/api/users/${user._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setEdit(false);
  };

  if (!user) return (
    <>
      <Header />
      <main className="main-content"><div className="content-wrapper"><h2>Nothing found</h2></div></main>
    </>
  );

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <section className="user-details">
            <div className="user-layout">
              <div className="user-left">
                <img src={user.user_avatar || "/assets/avatars/profile-avatar.webp"} alt={`${user.first_name}`} className="profile-avatar" />
                <h2 className="full-name">{user.first_name} {user.last_name}</h2>
                {canEdit && (
                  <div className="profile-actions">
                    <button className="edit-btn" onClick={() => setEdit(v => !v)}>
                      <img src="/assets/icons/pen.svg" className="edit-icon" /> {edit ? "Cancel" : "Edit"}
                    </button>
                    {edit && <button className="save-btn" onClick={save}>Save</button>}
                  </div>
                )}
              </div>
              <div className="user-right">
                {/* General + Contacts blocks; switch inputs when edit=true */}
                <div className="details-columns">
                  <div className="block general">
                    <h3><img src="/assets/icons/user.svg" alt="user" />General info</h3>
                    <ul>
                      <li><img src="/assets/icons/bag.svg" alt="bag" /><strong>Department:</strong>
                        <span className="value">{edit ? <input value={user.department||""} onChange={e=>setUser({ ...user, department: e.target.value })} /> : (user.department ?? "-")}</span></li>
                      <li><img src="/assets/icons/building.svg" alt="building" /><strong>Building:</strong>
                        <span className="value">{edit ? <input value={user.building||""} onChange={e=>setUser({ ...user, building: e.target.value })} /> : (user.building ?? "-")}</span></li>
                      <li><img src="/assets/icons/door.svg" alt="room" /><strong>Room:</strong>
                        <span className="value">{edit ? <input value={user.room||""} onChange={e=>setUser({ ...user, room: e.target.value })} /> : (user.room ?? "-")}</span></li>
                      <li><img src="/assets/icons/hashtag.svg" alt="desk" /><strong>Desk number:</strong>
                        <span className="value">{edit ? <input value={user.desk_number||""} onChange={e=>setUser({ ...user, desk_number: e.target.value })} /> : (user.desk_number ?? "-")}</span></li>
                    </ul>
                  </div>
                  <div className="block contacts">
                    <h3><img src="/assets/icons/user.svg" alt="contacts" />Contacts</h3>
                    <ul>
                      <li><img src="/assets/icons/phone.svg" alt="phone" /><strong>Mobile phone:</strong>
                        <span className="value">{edit ? <input value={user.phone||""} onChange={e=>setUser({ ...user, phone: e.target.value })} /> : (user.phone ?? "-")}</span></li>
                      <li><img src="/assets/icons/email.svg" alt="email" /><strong>Email:</strong>
                        <span className="value">{edit ? <input value={user.email||""} onChange={e=>setUser({ ...user, email: e.target.value })} /> : (user.email ?? "-")}</span></li>
                      <li><img src="/assets/icons/telegram.svg" alt="telegram" /><strong>Telegram:</strong>
                        <span className="value">{edit ? <input value={user.telegram||""} onChange={e=>setUser({ ...user, telegram: e.target.value })} /> : (user.telegram ?? "-")}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default UserDetails;
