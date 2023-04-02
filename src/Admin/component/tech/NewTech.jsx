import React, { useState } from "react";
import FormTech from "./FormTech";
import axiosClient from "../../../api/axiosClient";
import { useNavigate } from "react-router-dom";

const NewTech = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [linkWebsite, setLinkWebsite] = useState("");

  const navigate = useNavigate();
  const handleSubmitData = (e) => {
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("images[]", image[i]);
    }

    axiosClient
      .post("technologies/create", {
        name,
        detail,
        status,
        linkWebsite,
      })
      .then((res) => {
        axiosClient
          .post(`technologies/image-store/${res.data.id}`, formData)
          .then((res) => {
            navigate("/admin/cong-nghe", { replace: true });
          });
      })
      .catch((err) => {});
  };
  const handleChangeImage = (e) => {
    const imagesArray = [];
    console.log(e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      imagesArray.push(e.target.files[i]);
    }
    setImage(imagesArray);
  };
  return (
    <div>
      <FormTech
        name={name}
        detail={detail}
        image={image}
        linkWebsite={linkWebsite}
        setName={setName}
        setStatus={setStatus}
        status={status}
        setDetail={setDetail}
        setLinkWebsite={setLinkWebsite}
        setImage={setImage}
        handleChangeImage={handleChangeImage}
        handleSubmitData={handleSubmitData}
      />
    </div>
  );
};

export default NewTech;
