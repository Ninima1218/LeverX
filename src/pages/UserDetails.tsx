import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAppSelector } from "../store";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../store/usersApi";
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
  const auth = useAppSelector(state => state.auth);

  const { data: user, isLoading, error } = useGetUserByIdQuery(id!, { skip: !id });
  const current = auth.user;
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [updateUser] = useUpdateUserMutation();

  const canEdit = useMemo(() => canEditByRole(current, user || null), [current, user]);

  const startEdit = () => {
    if (!user) return;
    setEdit(true);
    setForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      telegram: user.telegram,
      citizenship: user.citizenship,
      department: user.department,
      building: user.building,
      room: user.room,
      desk_number: user.desk_number,
      visa: user.visa
    });
  };

  const save = async () => {
    if (!user) return;
    await updateUser({ id: user._id, data: form });
    setEdit(false);
  };

  if (isLoading) return <p>Loading user...</p>;
  if (error || !user) {
    return (
      <>
        <Header />
        <main className="main-content">
          <div className="content-wrapper"><h2>Nothing found</h2></div>
        </main>
      </>
    );
  }

  const avatarSrc = user.user_avatar
    ? `/assets/avatars/${user.user_avatar}`
    : "/assets/avatars/profile-avatar.webp";

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <section className="user-details">
            <div className="user-layout">
              <div className="user-left">
                <img src={avatarSrc} alt={`${user.first_name}`} className="profile-avatar" />
                <h2 className="full-name">{user.first_name} {user.last_name}</h2>
                {canEdit && (
                  <div className="profile-actions">
                    {!edit && (
                      <button className="edit-btn" onClick={startEdit}>
                        <img src={require("../assets/icons/pen.svg")} className="edit-icon" alt="edit" /> Edit
                      </button>
                    )}
                    {edit && (
                      <>
                        <button className="save-btn" onClick={save}>Save</button>
                        <button className="cancel-btn" onClick={() => setEdit(false)}>Cancel</button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="user-right">
                <div className="details-columns">
                  <div className="block general">
                    <h3 className="section-title">
                      <img src={require("../assets/icons/user.svg")} alt="user" /> General Info
                    </h3>
                    <ul>
                      <li><strong>Department:</strong>
                        <span className="value">{edit ? <input value={form.department||""} onChange={e=>setForm({ ...form, department: e.target.value })} /> : (user.department ?? "-")}</span></li>
                      <li><strong>Building:</strong>
                        <span className="value">{edit ? <input value={form.building||""} onChange={e=>setForm({ ...form, building: e.target.value })} /> : (user.building ?? "-")}</span></li>
                      <li><strong>Room:</strong>
                        <span className="value">{edit ? <input value={form.room||""} onChange={e=>setForm({ ...form, room: e.target.value })} /> : (user.room ?? "-")}</span></li>
                      <li><strong>Desk number:</strong>
                        <span className="value">{edit ? <input value={String(form.desk_number ?? "")} onChange={e=>setForm({ ...form, desk_number: e.target.value })} /> : (user.desk_number ?? "-")}</span></li>
                    </ul>
                  </div>

                  <div className="block contacts">
                    <h3 className="section-title">
                      <img src={require("../assets/icons/contacts.svg")} alt="contacts" /> Contacts
                    </h3>
                    <ul>
                      <li><strong>Mobile phone:</strong>
                        <span className="value">{edit ? <input value={form.phone||""} onChange={e=>setForm({ ...form, phone: e.target.value })} /> : (user.phone ?? "-")}</span></li>
                      <li><strong>Email:</strong>
                        <span className="value">{edit ? <input value={form.email||""} onChange={e=>setForm({ ...form, email: e.target.value })} /> : (user.email ?? "-")}</span></li>
                      <li><strong>Telegram:</strong>
                        <span className="value">{edit ? <input value={form.telegram||""} onChange={e=>setForm({ ...form, telegram: e.target.value })} /> : (user.telegram ?? "-")}</span></li>
                    </ul>
                  </div>

                  <div className="block travel">
                    <h3 className="section-title">
                      <img src={require("../assets/icons/travel.svg")} alt="travel" /> Travel Info
                    </h3>
                    <ul>
                      <li><strong>Citizenship:</strong>
                        <span className="value">{edit ? <input value={form.citizenship || ""} onChange={e => setForm({ ...form, citizenship: e.target.value })} /> : (user.citizenship ?? "-")}
                        </span>
                      </li>
                      <li><strong>Visa:</strong>
                        <span className="value">
                          {edit ? (
                            <input
                              value={form.visa ? String(form.visa) : ""}
                              onChange={e => setForm({ ...form, visa: e.target.value })}
                            />
                          ) : (
                            Array.isArray(user.visa)
                              ? user.visa.map(v => `${v.type} (${v.issuing_country})`).join(", ")
                              : user.visa ?? "-"
                          )}
                        </span>
                      </li>
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
