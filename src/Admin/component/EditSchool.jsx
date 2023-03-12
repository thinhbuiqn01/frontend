import React from "react";
import { useLocation } from "react-router-dom";

const EditSchool = () => {
  const location = useLocation();
  console.log(location);
  return <div>EditSchool</div>;
};

export default EditSchool;
