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
    title: "Tài khoản",
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
        <Link to={"/admin/nha-truong/xem"} state={{ user: record }}>
          Xem
        </Link>
      </Space>
    ),
  },
];
const School = () => {
  const [school, setSchool] = useState(
    JSON.parse(localStorage.getItem("USERS"))?.filter((item) => {
      return item.role == 2;
    }) || []
  );
  return (
    <div>
      <TableManage columns={columns} dataSources={school} />
    </div>
  );
};

export default School;
