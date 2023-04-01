import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";
import TableManage from "../components/TableManage";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: Math.random(),
    render: (_, record, index) => (
      <Space size="middle" key={index}>
        {index + 1}
      </Space>
    ),
  },
  {
    title: "Tên doanh nghiệp",
    dataIndex: "name",
    key: Math.random(),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: Math.random(),
  },
  {
    title: "Trạng thái",
    key: Math.random(),
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
    key: Math.random(),
    render: (_, record, index) => (
      <Space size="middle" key={index}>
        {console.log(record)}
        <Link
          to={`/truong/doanh-nghiep/xem/${record.id}`}
          state={{ user: record }}
        >
          Xem
        </Link>
      </Space>
    ),
  },
];

const Business = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axiosClient
      .post("users")
      .then((res) => {
        const data = res.data.users?.filter((i) => {
          return i.role == 3;
        });
        setBusinesses(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <PageComponent title={"Quản lý doanh nghiệp"}>
      <TableManage dataSources={businesses} columns={columns} />
    </PageComponent>
  );
};

export default Business;
