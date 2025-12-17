import React from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import EmployeeSection from "../components/EmployeeSection";
const Home = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null),
        React.createElement("main", { className: "main-content" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement(SearchPanel, null),
                React.createElement(EmployeeSection, null)))));
};
export default Home;
