import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import FormEditSchool from "./FormEditSchool";
import axiosClient from "../../api/axiosClient";
const EditSchool = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axiosClient
      .get(`admin/user/${params.idSchool}`)
      .then((res) => {
        setUser(res.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return <>{loading ? <FormEditSchool data={user} /> : "Loading..."}</>;
};

export default EditSchool;
