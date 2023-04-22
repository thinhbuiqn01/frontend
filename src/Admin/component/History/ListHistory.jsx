import { Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../api/axiosClient";
import { useStateContext } from "../../../context/ContextProvider";

const ListHistory = () => {
  const [histories, setHistories] = useState([]);
  const { currentUser, userToken } = useStateContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser.role === 4 && userToken) {
      getData();
    } else {
      navigate("/");
    }
  }, []);

  const getData = async () => {
    const response = await axiosClient.get(`history/get/${currentUser.id}`);

    setHistories(response.data.slice(0, 10));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, data, index) => {
        return <>{index + 1}</>;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "id",
    },
    {
      title: "Thời gian",
      dataIndex: "id",
      key: "id",
      render: (_, data, index) => {
        return (
          <span key={index}>{moment(data.created_at).format("llll")}</span>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={histories} />
    </>
  );
};

export default ListHistory;
