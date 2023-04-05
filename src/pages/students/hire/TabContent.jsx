import React from "react";
import { Badge, Tabs } from "antd";

import HireContentBusiness from "./HireContentBusiness";
import HireContentJob from "./HireContentJob";

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
