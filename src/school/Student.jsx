import { Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";
import TableManage from "../components/TableManage";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    render: (_, record, index) => (
      <Space size="middle" key={index}>
        {index + 1}
      </Space>
    ),
  },
  {
    title: "Họ tên sinh viên",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (_, record, index) => (
      <Space size="middle" key={index}>
        {record.status === 1 ? "Hoạt động" : "Tạm khóa"}
      </Space>
    ),
  },
  {
    title: "Hành động",
    dataIndex: "action",
    render: (_, record, index) => (
      <Space size="middle" key={index}>
        <Link to={"/truong/sinh-vien/xem"} state={{ user: record }}>
          Xem
        </Link>
      </Space>
    ),
  },
];

const Student = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axiosClient
      .post("users")
      .then((res) => {
        const data = res.data.users?.filter((i) => {
          return i.role == 1;
        });
        setStudents(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); 
  return (
    <PageComponent title="Quản lý sinh viên">
      <TableManage columns={columns} dataSources={students} />
    </PageComponent>
  );
};

export default Student;
