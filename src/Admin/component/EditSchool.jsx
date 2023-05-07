import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import FormEditSchool from "./FormEditSchool";
import axiosClient from "../../api/axiosClient";
import { useStateContext } from "../../context/ContextProvider";
import Loading from "../../components/Loading";
const EditSchool = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { userToken, currentUser } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken && currentUser.role === 4) {
      axiosClient
        .get(`admin/user/${params.idSchool}`)
        .then((res) => {
          setUser(res.data);
          setLoading(true);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, []);

  return <>{loading ? <FormEditSchool data={user} /> : <Loading />}</>;
};

export default EditSchool;
