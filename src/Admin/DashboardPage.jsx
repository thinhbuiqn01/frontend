import React from "react";
import styled from "styled-components";
import CardBox from "./statistical/CardBox";
import StatisticalList from "./statistical/StatisticalList";
import History from "./component/History";

const DashboardPage = () => {
  return (
    <Wrapper>
      <CardBox />
      <StatisticalList />
      <History />
    </Wrapper>
  );
};

export default DashboardPage;

const Wrapper = styled.div``;
