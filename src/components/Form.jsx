import axios from "axios";
import React, { useState } from "react";
import { login } from "../utils/APIRoutes";
const Form = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

 

  return (
    <>sadasdas</>
  );
};

export default Form;
