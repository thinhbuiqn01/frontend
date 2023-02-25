import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";

const ManageStudent = () => {
  const [roleGetData, setRoleGetData] = useState(1);
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("LIST_STUDENT")) || []
  );

  const [display, setDisplay] = useState("hidden");

  useEffect(() => {
    axiosClient
      .post(`users/${roleGetData}`)
      .then(({ data, status }) => {
        localStorage.setItem("LIST_STUDENT", JSON.stringify(data.users));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ tên sinh viên",
      dataIndex: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/truong/sinh-vien/xem"} state={{ user: record }}>
            Xem
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <PageComponent title="Quản lý sinh viên">
      <Table columns={columns} dataSource={students} />
    </PageComponent>
  );
};

export default ManageStudent;
