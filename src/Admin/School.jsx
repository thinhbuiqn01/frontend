import { Button, Space, Spin } from "antd";
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
    title: "Tài khoản",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (_, record) => (
      <Space size="middle" key={record.id}>
        {record.status == 1 ? "Đang hoạt động" : "Tạm khóa"}
      </Space>
    ),
  },
  {
    title: "Hành động",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle" key={record.id}>
        <Link to={"/admin/nha-truong/xem"} state={{ user: record }}>
          Xem
        </Link>
      </Space>
    ),
  },
];
const School = () => {
  const [school, setSchool] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosClient
      .post("users")
      .then((res) => {
        const data = res.data.users?.filter((i) => {
          return i.role == 2;
        });
        setSchool(data);
        setLoading(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <div>
        <Link to="/admin/nha-truong/them">
          <Button type="primary" ghost>
            Thêm tài khoản cho nhà trường
          </Button>
        </Link>
        <div style={{ marginBottom: "20px" }}></div>
        <>
          {loading == false ? (
            <div style={{ width: "700px", height: "300px", margin: "0 auto" }}>
              <Spin />
            </div>
          ) : (
            <TableManage columns={columns} dataSources={school} />
          )}
        </>
      </div>
    </>
  );
};

export default School;
