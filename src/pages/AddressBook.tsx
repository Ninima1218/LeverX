import React from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import EmployeeSection from "../components/EmployeeSection";

const AddressBook: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <SearchPanel />
          <EmployeeSection />
        </div>
      </main>
    </>
  );
};

export default AddressBook;
