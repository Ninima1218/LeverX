import React, { useState } from "react";

const SearchPanel: React.FC<{ onChange: (f: any) => void }> = ({ onChange }) => {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [basic, setBasic] = useState("");
  const [adv, setAdv] = useState({
    name: "", email: "", phone: "", telegram: "",
    building: "", room: "", department: ""
  });

  const submitBasic = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({ name: basic });
  };

  const submitAdv = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({
      name: adv.name, email: adv.email, phone: adv.phone, telegram: adv.telegram,
      building: adv.building === "Any" ? "" : adv.building,
      room: adv.room, department: adv.department === "Any" ? "" : adv.department
    });
  };

  return (
    <section className="search-filter-section">
      <input type="radio" name="search-mode" id="basic-search" className="search-radio" checked={mode==="basic"} onChange={() => setMode("basic")} />
      <input type="radio" name="search-mode" id="advanced-search" className="search-radio" checked={mode==="advanced"} onChange={() => setMode("advanced")} />
      <div className="search-tabs">
        <label htmlFor="basic-search" className={`search-tab ${mode==="basic"?"active":""}`}>Basic Search</label>
        <label htmlFor="advanced-search" className={`search-tab ${mode==="advanced"?"active":""}`}>Advanced Search</label>
      </div>

      <form className={`search-form search-form-basic ${mode==="basic"?"show":""}`} onSubmit={submitBasic}>
        <div className="input-wrapper">
          <img src="/assets/icons/search.svg" alt="search icon" className="search-icon" />
          <input type="text" id="employee-search" placeholder="John Smith" value={basic} onChange={e => setBasic(e.target.value)} />
        </div>
        <button type="submit" className="search-btn">SEARCH</button>
      </form>

      <form className={`search-form search-form-advanced ${mode==="advanced"?"show":""}`} onSubmit={submitAdv}>
        {/* replicate your advanced form fields */}
        {/* Name */}
        <label className="field-label" htmlFor="adv-name">Name</label>
        <input id="adv-name" className="text-input" value={adv.name} onChange={e => setAdv({ ...adv, name: e.target.value })} />
        {/* Email */}
        <label className="field-label" htmlFor="adv-email">Email</label>
        <input id="adv-email" type="email" className="text-input" value={adv.email} onChange={e => setAdv({ ...adv, email: e.target.value })} />
        {/* Phone & Telegram */}
        <div className="field-row">
          <div className="field-col">
            <label className="field-label" htmlFor="adv-phone">Phone</label>
            <input id="adv-phone" className="text-input" value={adv.phone} onChange={e => setAdv({ ...adv, phone: e.target.value })} />
          </div>
          <div className="field-col">
            <label className="field-label" htmlFor="adv-telegram">Telegram</label>
            <input id="adv-telegram" className="text-input" value={adv.telegram} onChange={e => setAdv({ ...adv, telegram: e.target.value })} />
          </div>
        </div>
        {/* Building & Room */}
        <div className="field-row">
          <div className="field-col">
            <label className="field-label" htmlFor="adv-building">Building</label>
            <select id="adv-building" className="select-input" value={adv.building} onChange={e => setAdv({ ...adv, building: e.target.value })}>
              <option>Any</option><option>Kazbegi 5</option><option>Agmashenebeli 3</option>
            </select>
          </div>
          <div className="field-col">
            <label className="field-label" htmlFor="adv-room">Room</label>
            <input id="adv-room" className="text-input" value={adv.room} onChange={e => setAdv({ ...adv, room: e.target.value })} />
          </div>
        </div>
        {/* Department */}
        <label className="field-label" htmlFor="adv-department">Department</label>
        <select id="adv-department" className="select-input" value={adv.department} onChange={e => setAdv({ ...adv, department: e.target.value })}>
          <option>Any</option><option>Web &amp; Mobile</option><option>Tech Support</option><option>Cybersecurity</option>
        </select>

        <button type="submit" className="search-btn">SEARCH</button>
      </form>
    </section>
  );
};
export default SearchPanel;
