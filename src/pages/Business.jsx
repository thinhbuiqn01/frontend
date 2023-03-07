import React, { useState } from "react";
import MenuBusiness from "../components/Business/Menu";

import PageComponent from "../components/PageComponent";
import Search from "../components/Search";
import BusinessView from "./BusinessView";

const Business = () => {
  return <PageComponent title={<MenuBusiness />}></PageComponent>;
};

export default Business;
