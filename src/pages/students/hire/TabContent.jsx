import React from "react";
import { Badge, Radio, Space, Tabs } from "antd";
import HireContentJob from "./HireContentJob";
import HireContentBusiness from "./HireContentBusiness";
import styled from "styled-components";

const TabContent = ({ loading, business, jobs }) => {
  const listTab = [
    {
      label: "Công ty",
      key: 1,
      children: <HireContentBusiness business={business} />,
    },
    {
      label: (
        <Badge offset={[10, 0]} count={jobs.length}>
          Công việc
        </Badge>
      ),
      key: 2,
      children: <HireContentJob business={business} jobs={jobs} />,
    },
  ];
  return (
    <>
      <Tabs defaultActiveKey={2} tabPosition={"top"} items={listTab} />
    </>
  );
};

export default TabContent;
