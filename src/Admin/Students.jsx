import { Space, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TableManage from "../components/TableManage";
import { useStateContext } from "../context/ContextProvider";

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
    render: (_, record, index) => (
      <Space size="middle" key={record.id}>
        <Tag color={record.status ? "green" : "red"}>
          {record.status ? "Hoạt động" : " Tạm khóa"}
        </Tag>
      </Space>
    ),
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
  const navigate = useNavigate();
  const { userToken, currentUser } = useStateContext();

  useEffect(() => {
    if (userToken && currentUser.role === 4) {
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
    } else {
      navigate("/");
    }
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
