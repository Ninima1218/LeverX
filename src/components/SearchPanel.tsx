import React, { useState } from "react";

type Props = {
  onChange: (filter: any) => void;
};

const SearchPanel: React.FC<Props> = ({ onChange }) => {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [form, setForm] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    onChange(updated);
  };

  return (
    <div className="search-filter-section">
      <div className="search-tabs">
        <button className={`search-tab ${mode === "basic" ? "active" : ""}`} onClick={() => setMode("basic")}>
          Basic Search
        </button>
        <button className={`search-tab ${mode === "advanced" ? "active" : ""}`} onClick={() => setMode("advanced")}>
          Advanced Search
        </button>
      </div>

      <form className={`search-form ${mode === "basic" ? "search-form-basic show" : "search-form-basic"}`}>
        <div className="input-wrapper">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            value={form.name || ""}
            onChange={handleChange}
          />
          <img className="search-icon" src={require("../assets/icons/search.svg")} alt="search" />
        </div>
        <button type="submit" className="search-btn">SEARCH</button>
      </form>

      <form className={`search-form ${mode === "advanced" ? "search-form-advanced show" : "search-form-advanced"}`}>
        <input type="text" name="email" placeholder="Email" value={form.email || ""} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={form.phone || ""} onChange={handleChange} />
        <input type="text" name="telegram" placeholder="Telegram" value={form.telegram || ""} onChange={handleChange} />
        <input type="text" name="room" placeholder="Room" value={form.room || ""} onChange={handleChange} />
        <select name="building" value={form.building || ""} onChange={handleChange}>
          <option value="">Any Building</option>
          <option value="LPT">LPT</option>
          <option value="B1">B1</option>
        </select>
        <select name="department" value={form.department || ""} onChange={handleChange}>
          <option value="">Any Department</option>
          <option value="Web & Mobile">Web & Mobile</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>
        <button type="submit" className="search-btn">SEARCH</button>
      </form>
    </div>
  );
};

export default SearchPanel;
