import React, { useState } from "react";
import PageComponent from "../components/PageComponent";
import BusinessView from "./BusinessView";

const Business = () => {
 
  return (
    <PageComponent title="Business">
      <BusinessView />
    </PageComponent>
  );
};

export default Business;
