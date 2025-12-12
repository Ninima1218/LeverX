import React from "react";
import Header from "../components/Header";

const Settings: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <section className="settings-section">
            <h2>User Management</h2>

            <div className="search-wrapper">
              <input
                type="text"
                id="search"
                className="text-input"
                placeholder="Search users..."
              />
            </div>

            <table id="roles-table" className="roles-table">
              {/* Таблица будет заполняться динамически */}
            </table>
          </section>

          <div id="edit-modal" className="modal hidden">
            <div className="modal-content">
              <h3>Edit User</h3>
              <form id="edit-form" className="edit-form">
                <label>First Name <input type="text" name="first_name" /></label>
                <label>Last Name <input type="text" name="last_name" /></label>
                <label>First Native Name <input type="text" name="first_native_name" /></label>
                <label>Last Native Name <input type="text" name="last_native_name" /></label>
                <label>Middle Native Name <input type="text" name="middle_native_name" /></label>
                <label>Email <input type="email" name="email" /></label>
                <label>Phone <input type="text" name="phone" /></label>
                <label>Telegram <input type="text" name="telegram" /></label>
                <label>Citizenship <input type="text" name="citizenship" /></label>
                <label>Role
                  <select name="role">
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                    <option value="Admin">Admin</option>
                  </select>
                </label>
                <div className="modal-actions">
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" id="cancel-edit" className="cancel-btn">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;

