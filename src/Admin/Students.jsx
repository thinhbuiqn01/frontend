import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TableManage from "../components/TableManage";
import ManageStudent from "../school/ManageStudent";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Tên sinh viên",
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
      <Space size="middle" key={record.id}>
        <Link to={"/admin/sinh-vien/xem"} state={{ user: record }}>
          Xem
        </Link>
      </Space>
    ),
  },
];
const Students = () => { 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosClient
      .post("users")
      .then((res) => {
        localStorage.setItem("USERS", JSON.stringify(res.data.users));
        const data = res.data.users?.filter((i) => {
          return i.role == 1;
        });
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <TableManage columns={columns} dataSources={users} />
    </>
  );
};

export default Students;
