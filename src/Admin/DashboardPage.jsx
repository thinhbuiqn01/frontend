import React from "react";
import styled from "styled-components";
import CardBox from "./statistical/CardBox";
import StatisticalList from "./statistical/StatisticalList";

const DashboardPage = () => {
  return (
    <Wrapper>
      <CardBox />
      <StatisticalList />
    </Wrapper>
  );
};

export default DashboardPage;

const Wrapper = styled.div``;
