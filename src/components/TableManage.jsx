import { Table } from "antd";
import React from "react";

const TableManage = ({ columns, dataSources }) => {
  return (
    <>
      <Table columns={columns} dataSource={dataSources} />
    </>
  );
};

export default TableManage;
