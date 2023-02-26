import { Space } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const [businesses, setBusinesses] = useState(
    JSON.parse(localStorage.getItem("USERS"))?.filter((item) => {
      return item.role == 3;
    }) || []
  );
  return (
    <>
      <TableManage columns={columns} dataSources={businesses} />
    </>
  );
};

export default Business;
