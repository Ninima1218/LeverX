import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useAppSelector } from "../store";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../store/usersApi";
import { User } from "@shared/types/User";

const canEditByRole = (current: User | null, target: User | null) => {
  if (!current || !target) return false;
  if (current.role === "Admin") return true;
  if (current.role === "HR") {
    const mgrId = target.manager?.id ?? target.manager_id;
    return String(mgrId) === String(current._id) || current._id === target._id;
  }
  return current._id === target._id;
};

const formatDateBirth = (date: any) => {
  if (!date || !date.year) return "-";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${String(date.day).padStart(2, '0')} ${months[date.month - 1]} ${date.year}`;
};

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const auth = useAppSelector(state => state.auth);
  const [copied, setCopied] = useState(false);

  const { data: user, isLoading, error } = useGetUserByIdQuery(id!, { skip: !id });
  const current = auth.user;
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [updateUser] = useUpdateUserMutation();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  const canEdit = useMemo(() => canEditByRole(current, user || null), [current, user]);

  const startEdit = () => {
    if (!user) return;
    setEdit(true);
    setForm({ ...user }); 
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
    ? user.user_avatar.startsWith('http') ? user.user_avatar : `/assets/avatars/${user.user_avatar}`
    : "/assets/avatars/profile-avatar.webp";

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <section className="user-details">
            <div className="user-layout">
              
              <div className="user-left">
                <button className="back-btn" onClick={() => window.history.back()}>
                  <img src={require("../assets/icons/arrow-left.svg")} alt="back" />
                </button>

                <img src={avatarSrc} alt={user.first_name} className="profile-avatar" />
                <h2 className="full-name">{user.first_name} {user.last_name}</h2>
                <p className="secondary-name">{user.last_name} {user.first_name[0]}.</p>

                <div className="profile-actions">
                  <button className={`copy-link-btn ${copied ? 'copied' : ''}`} onClick={handleCopyLink}>
                    <img src={require("../assets/icons/copy.svg")} alt="copy" />
                    {copied ? "Copied!" : "Copy link"}
                  </button>

                  {!edit && canEdit && (
                    <button className="edit-btn" onClick={startEdit}>
                      <img src={require("../assets/icons/pen.svg")} className="edit-icon" alt="edit" /> EDIT
                    </button>
                  )}
                  {edit && (
                    <div className="edit-controls">
                      <button className="save-btn" onClick={save}>Save</button>
                      <button className="cancel-btn" onClick={() => setEdit(false)}>Cancel</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="vertical-divider"></div>

              <div className="user-right">
                <div className="details-columns">
                  
                  <div className="block general">
                    <h3 className="section-title">GENERAL INFO</h3>
                    <ul>
                      <li>
                        <img src={require("../assets/icons/bag.svg")} alt="" />
                        <strong>Department</strong>
                        <span className="value">{edit ? <input value={form.department || ""} onChange={e => setForm({ ...form, department: e.target.value })} /> : (user.department ?? "-")}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/building.svg")} alt="" />
                        <strong>Building</strong>
                        <span className="value">{edit ? <input value={form.building || ""} onChange={e => setForm({ ...form, building: e.target.value })} /> : (user.building ?? "-")}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/door.svg")} alt="" />
                        <strong>Room</strong>
                        <span className="value">{edit ? <input value={form.room || ""} onChange={e => setForm({ ...form, room: e.target.value })} /> : (user.room ?? "-")}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/hashtag.svg")} alt="" />
                        <strong>Desk number</strong>
                        <span className="value">{edit ? <input value={String(form.desk_number ?? "")} onChange={e => setForm({ ...form, desk_number: e.target.value })} /> : (user.desk_number ?? "-")}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/calendar3.svg")} alt="" />
                        <strong>Date of birth</strong>
                        <span className="value">{formatDateBirth(user.date_birth)}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/user.svg")} alt="" />
                        <strong>Manager</strong>
                        <span className="value" style={{ color: '#5c85cc' }}>
                          {user.manager ? `${user.manager.first_name} ${user.manager.last_name}` : "-"}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="horizontal-divider"></div>

                  <div className="block contacts">
                    <h3 className="section-title">CONTACTS</h3>
                    <ul>
                      <li>
                        <img src={require("../assets/icons/phone.svg")} alt="" />
                        <strong>Mobile phone</strong>
                        <span className="value" style={{ color: '#5c85cc' }}>{edit ? <input value={form.phone || ""} onChange={e => setForm({ ...form, phone: e.target.value })} /> : (user.phone ?? "-")}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/email.svg")} alt="" />
                        <strong>Email</strong>
                        <span className="value" style={{ color: '#5c85cc' }}>{edit ? <input value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} /> : (user.email ?? "-")}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/telegram.svg")} alt="" />
                        <strong>Telegram</strong>
                        <span className="value" style={{ color: '#5c85cc' }}>{edit ? <input value={form.telegram || ""} onChange={e => setForm({ ...form, telegram: e.target.value })} /> : (user.telegram ?? "-")}</span>
                      </li>
                      <li>
                        <img src={require("../assets/icons/c-number.svg")} alt="" />
                        <strong>C-Number</strong>
                        <span className="value">{user.cnumber ?? "-"}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="horizontal-divider"></div>

                  <div className="block travel">
                    <h3 className="section-title">TRAVEL INFO</h3>
                    <ul>
                      <li>
                        <img src={require("../assets/icons/earth.svg")} alt="" />
                        <strong>Citizenship</strong>
                        <span className="value">{user.citizenship ?? "-"}</span>
                      </li>
                      {user.visa && user.visa.length > 0 ? user.visa.map((v: any, index: number) => (
                        <React.Fragment key={index}>
                          <li>
                            <img src={require("../assets/icons/visa.svg")} alt="" />
                            <strong>Visa {index + 1}</strong>
                            <span className="value">{v.type} ({v.issuing_country})</span>
                          </li>
                          <li>
                            <img src={require("../assets/icons/calendar2.svg")} alt="" />
                            <strong>Visa {index + 1} validity period</strong>
                            <span className="value">
                              {v.start_date} - {v.end_date}
                            </span>
                          </li>
                        </React.Fragment>
                      )) : (
                        <>
                          <li>
                            <img src={require("../assets/icons/visa.svg")} alt="" />
                            <strong>Visa 1</strong>
                            <span className="value">-</span>
                          </li>
                          <li>
                            <img src={require("../assets/icons/calendar2.svg")} alt="" />
                            <strong>Visa 1 validity period</strong>
                            <span className="value">-</span>
                          </li>
                        </>
                      )}
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