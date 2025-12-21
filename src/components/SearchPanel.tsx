import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setFilter, clearFilter } from "../store/filterSlice";

const SearchPanel: React.FC = () => {
    const [mode, setMode] = useState<"basic" | "advanced">("basic");
    const dispatch = useAppDispatch();
    const form = useAppSelector((state) => state.filter);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setFilter({ key: name, value }));
    };

    const handleClear = () => {
        dispatch(clearFilter());
    };

    return (
        <div className="search-filter-section">
            <div className="search-tabs">
                <button
                    type="button"
                    className={`search-tab ${mode === "basic" ? "active" : ""}`}
                    onClick={() => setMode("basic")}
                >
                    BASIC SEARCH
                </button>
                <button
                    type="button"
                    className={`search-tab ${mode === "advanced" ? "active" : ""}`}
                    onClick={() => setMode("advanced")}
                >
                    ADVANCED SEARCH
                </button>
            </div>

            <form
                className={`search-form ${mode === "basic" ? "show" : ""}`}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="name"
                        placeholder="Search by name"
                        value={form.name || ""}
                        onChange={handleChange}
                    />
                    <img
                        className="search-icon"
                        src={require("../assets/icons/search.svg")}
                        alt="search"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="search-btn">SEARCH</button>
                    <button type="button" className="clear-btn" onClick={handleClear}>CLEAR</button>
                </div>
            </form>

            <form
                className={`search-form ${mode === "advanced" ? "show" : ""}`}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="field-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="John Smith" 
                        value={form.name || ""} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="field-group">
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="john.smith@leverx.com" 
                        value={form.email || ""} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="row">
                    <div className="field-group">
                        <label>Phone</label>
                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="Phone number" 
                            value={form.phone || ""} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="field-group">
                        <label>Telegram</label>
                        <input 
                            type="text" 
                            name="telegram" 
                            placeholder="@username" 
                            value={form.telegram || ""} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="field-group">
                        <label>Building</label>
                        <select name="building" value={form.building || ""} onChange={handleChange}>
                            <option value="">Any</option>
                            <option value="LPT">LPT</option>
                            <option value="B1">B1</option>
                        </select>
                    </div>
                    <div className="field-group">
                        <label>Room</label>
                        <input 
                            type="text" 
                            name="room" 
                            placeholder="303.1" 
                            value={form.room || ""} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="field-group">
                    <label>Department</label>
                    <select name="department" value={form.department || ""} onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="Web & Mobile">Web & Mobile</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="search-btn">SEARCH</button>
                    <button type="button" className="clear-btn" onClick={handleClear}>CLEAR</button>
                </div>
            </form>
        </div>
    );
};

export default SearchPanel;