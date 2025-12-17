import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setFilter, clearFilter } from "../store/filterSlice";
const SearchPanel = () => {
    const [mode, setMode] = useState("basic");
    const dispatch = useAppDispatch();
    const form = useAppSelector(state => state.filter);
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFilter({ key: name, value }));
    };
    const handleClear = () => {
        dispatch(clearFilter());
    };
    return (React.createElement("div", { className: "search-filter-section" },
        React.createElement("div", { className: "search-tabs" },
            React.createElement("button", { className: `search-tab ${mode === "basic" ? "active" : ""}`, onClick: () => setMode("basic") }, "Basic Search"),
            React.createElement("button", { className: `search-tab ${mode === "advanced" ? "active" : ""}`, onClick: () => setMode("advanced") }, "Advanced Search")),
        React.createElement("form", { className: `search-form ${mode === "basic" ? "search-form-basic show" : "search-form-basic"}`, onSubmit: e => e.preventDefault() },
            React.createElement("div", { className: "input-wrapper" },
                React.createElement("input", { type: "text", name: "name", placeholder: "Search by name", value: form.name || "", onChange: handleChange }),
                React.createElement("img", { className: "search-icon", src: require("../assets/icons/search.svg"), alt: "search" })),
            React.createElement("button", { type: "submit", className: "search-btn" }, "SEARCH"),
            React.createElement("button", { type: "button", className: "search-btn", onClick: handleClear }, "CLEAR")),
        React.createElement("form", { className: `search-form ${mode === "advanced" ? "search-form-advanced show" : "search-form-advanced"}`, onSubmit: e => e.preventDefault() },
            React.createElement("input", { type: "text", name: "email", placeholder: "Email", value: form.email || "", onChange: handleChange }),
            React.createElement("input", { type: "text", name: "phone", placeholder: "Phone", value: form.phone || "", onChange: handleChange }),
            React.createElement("input", { type: "text", name: "telegram", placeholder: "Telegram", value: form.telegram || "", onChange: handleChange }),
            React.createElement("input", { type: "text", name: "room", placeholder: "Room", value: form.room || "", onChange: handleChange }),
            React.createElement("select", { name: "building", value: form.building || "", onChange: handleChange },
                React.createElement("option", { value: "" }, "Any Building"),
                React.createElement("option", { value: "LPT" }, "LPT"),
                React.createElement("option", { value: "B1" }, "B1")),
            React.createElement("select", { name: "department", value: form.department || "", onChange: handleChange },
                React.createElement("option", { value: "" }, "Any Department"),
                React.createElement("option", { value: "Web & Mobile" }, "Web & Mobile"),
                React.createElement("option", { value: "Cybersecurity" }, "Cybersecurity")),
            React.createElement("button", { type: "submit", className: "search-btn" }, "SEARCH"),
            React.createElement("button", { type: "button", className: "search-btn", onClick: handleClear }, "CLEAR"))));
};
export default SearchPanel;
