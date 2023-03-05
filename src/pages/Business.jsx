import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import Search from "../components/Search";
import BusinessView from "./BusinessView";

const Business = () => {
  return <PageComponent title={<Search />}></PageComponent>;
};

export default Business;
