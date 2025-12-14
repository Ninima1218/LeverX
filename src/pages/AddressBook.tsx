import React from "react";
import Header from "../components/Header";
import SearchPanel from "../components/SearchPanel";
import EmployeeSection from "../components/EmployeeSection";

const AddressBook: React.FC = () => {
  const handleSearchChange = (value: string) => {
    // Пока просто логируем, позже можно связать с фильтрацией
    console.log("Search value:", value);
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          <SearchPanel onChange={handleSearchChange} />
          <EmployeeSection />
        </div>
      </main>
    </>
  );
};

export default AddressBook;
