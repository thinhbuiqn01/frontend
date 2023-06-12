import React, { useLayoutEffect, useState } from "react";
import FormTech from "./FormTech";
import axiosClient from "../../../api/axiosClient";
import { useNavigate, useNavigation } from "react-router-dom";
import { useStateContext } from "../../../context/ContextProvider";

const NewTech = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [linkWebsite, setLinkWebsite] = useState("");

  const { currentUser, userToken } = useStateContext();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (currentUser.role !== 4 && userToken) {
      navigate("/");
    }
  });
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
            axiosClient.post("history/add", {
              content: `${currentUser.name} - ${currentUser.id} Đã sửa thêm công nghệ mới`,
              user_id: currentUser.id,
            });
            navigate("/admin/cong-nghe", { replace: true });
          });
      })
      .catch((err) => {});
  };
  const handleChangeImage = (e) => {
    const imagesArray = [];
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
