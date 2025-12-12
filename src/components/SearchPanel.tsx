import React from "react";
import "../styles/_search.scss";
import searchIcon from "../assets/icons/search.svg";

const SearchPanel: React.FC = () => {
  return (
    <section className="search-filter-section">
      {/* Радио переключатели */}
      <input type="radio" name="search-mode" id="basic-search" className="search-radio" defaultChecked />
      <input type="radio" name="search-mode" id="advanced-search" className="search-radio" />

      {/* Табы */}
      <div className="search-tabs">
        <label htmlFor="basic-search" className="search-tab">Basic Search</label>
        <label htmlFor="advanced-search" className="search-tab">Advanced Search</label>
      </div>

      {/* Basic Search */}
      <form className="search-form search-form-basic">
        <div className="input-wrapper">
          <img src={searchIcon} alt="search icon" className="search-icon" />
          <input type="text" id="employee-search" placeholder="John Smith" />
        </div>
        <button type="submit" className="search-btn">SEARCH</button>
      </form>

      {/* Advanced Search */}
      <form className="search-form search-form-advanced">
        <label className="field-label" htmlFor="adv-name">Name</label>
        <input type="text" id="adv-name" className="text-input" placeholder="John Smith" />

        <label className="field-label" htmlFor="adv-email">Email</label>
        <input type="email" id="adv-email" className="text-input" placeholder="john.smith@leverx.com" />

        <div className="field-row">
          <div className="field-col">
            <label className="field-label" htmlFor="adv-phone">Phone</label>
            <input type="text" id="adv-phone" className="text-input" placeholder="Phone number" />
          </div>
          <div className="field-col">
            <label className="field-label" htmlFor="adv-telegram">Telegram</label>
            <input type="text" id="adv-telegram" className="text-input" placeholder="@Nickname" />
          </div>
        </div>

        <div className="field-row">
          <div className="field-col">
            <label className="field-label" htmlFor="adv-building">Building</label>
            <select id="adv-building" className="select-input">
              <option>Any</option>
              <option>Kazbegi 5</option>
              <option>Agmashenebeli 3</option>
            </select>
          </div>
          <div className="field-col">
            <label className="field-label" htmlFor="adv-room">Room</label>
            <input type="text" id="adv-room" className="text-input" placeholder="303.1" />
          </div>
        </div>

        <label className="field-label" htmlFor="adv-department">Department</label>
        <select id="adv-department" className="select-input">
          <option>Any</option>
          <option>Web &amp; Mobile</option>
          <option>Tech Support</option>
          <option>Cybersecurity</option>
        </select>

        <button type="submit" className="search-btn">SEARCH</button>
      </form>
    </section>
  );
};

export default SearchPanel;
