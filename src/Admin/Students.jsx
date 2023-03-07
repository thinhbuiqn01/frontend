import { Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TableManage from "../components/TableManage";

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
    title: "Email",
    dataIndex: "email",
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosClient
      .post("users")
      .then((res) => {
        const data = res.data.users?.filter((i) => {
          return i.role == 1;
        });
        setUsers(data);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      {loading == false ? (
        <div style={{ width: "700px", height: "300px", margin: "0 auto" }}>
          <Spin />
        </div>
      ) : (
        <TableManage columns={columns} dataSources={users} />
      )}
    </>
  );
};

export default Students;
