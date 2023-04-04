import React, { useEffect, useState } from "react";
import FormTech from "./FormTech";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";

const EditTech = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [linkWebsite, setLinkWebsite] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axiosClient
      .get(`technologies/${params.idTech}`)
      .then((res) => {
        setName(res.data.name);
        setDetail(res.data.description);
        setImage(res.data.image);
        setStatus(res.data.status);
        setLinkWebsite(res.data.link_page);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitData = () => {
    axiosClient
      .post(`technologies/update/${params.idTech}`, {
        name,
        description: detail,
        status,
        link_page: linkWebsite,
      })
      .then((res) => {
        if (image) {
          const formData = new FormData();
          for (let i = 0; i < image.length; i++) {
            formData.append("images[]", image[i]);
          }
          axiosClient
            .post(`technologies/image-store/${params.idTech}`, formData)
            .then((res) => {
              navigate("/admin/cong-nghe", { replace: true });
            });
        }
        navigate("/admin/cong-nghe", { replace: true });
      })
      .catch((err) => console.error(err));
  };

  const handleChangeImage = (e) => {
    const imagesArray = []; 
    for (let i = 0; i < e.target.files.length; i++) {
      imagesArray.push(e.target.files[i]);
    }
    setImage(imagesArray);
  };

  return (
    <>
      <FormTech
        name={name}
        detail={detail}
        image={image}
        linkWebsite={linkWebsite}
        status={status}
        params={params.idTech}
        setName={setName}
        setStatus={setStatus}
        setDetail={setDetail}
        setLinkWebsite={setLinkWebsite}
        setImage={setImage}
        handleChangeImage={handleChangeImage}
        handleSubmitData={handleSubmitData}
      />
    </>
  );
};

export default EditTech;
