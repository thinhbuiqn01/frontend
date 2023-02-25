import React, { useState } from "react";
import PageComponent from "../components/PageComponent";

const Business = () => {
  const [business, setBusiness] = useState({
    name:"",
    slug:"slug",
    description:"",
    image:"",
    image_url:"", 
    jobs:"",
  });
  return <PageComponent title="Business">
    bussness
  </PageComponent>;
};

export default Business;
