import React from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import EmployeeTable from "../components/EmployeeTable";

const AddressBook: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <SearchPanel />
          <EmployeeTable />
        </div>
      </main>
    </>
  );
};
export default AddressBook;
