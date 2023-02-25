import React from "react";
import NewListStudent from "./NewListStudent";
import PageComponent from "../components/PageComponent";
import Dashboard from "./Dashboard";
import Header from "../components/Header";

const School = () => {
  return (
    <PageComponent title="Trang trường">
      <Dashboard />
    </PageComponent>
  );
};

export default School;
