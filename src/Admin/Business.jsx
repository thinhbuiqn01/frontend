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
    title: "Tên doanh nghiệp",
    dataIndex: "name",
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
        <Link to={"/admin/doanh-nghiep/xem"} state={{ user: record }}>
          Xem
        </Link>
      </Space>
    ),
  },
];
const Business = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosClient
      .post("users")
      .then((res) => {
        const data = res.data.users?.filter((i) => {
          return i.role == 3;
        });
        setBusinesses(data);
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
        <TableManage columns={columns} dataSources={businesses} />
      )}
    </>
  );
};

export default Business;
