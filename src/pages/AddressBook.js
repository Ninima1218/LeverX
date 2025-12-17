import React from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import EmployeeTable from "../components/EmployeeTable";
const AddressBook = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Header, null),
        React.createElement("main", { className: "main-content" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement(SearchPanel, null),
                React.createElement(EmployeeTable, null)))));
};
export default AddressBook;
