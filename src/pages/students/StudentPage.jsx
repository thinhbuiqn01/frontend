import React from "react";
import { Outlet } from "react-router-dom";
import SearchData from "../../components/SearchData";

const StudentPage = () => {
  return (
    <>
      <SearchData />
      <Outlet />
    </>
  );
};

export default StudentPage;
