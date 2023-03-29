import React from "react";
import HotJobs from "../../components/HotJobs";
import Blog from "./Blog";
import BusinessHighlight from "./components/BusinessHighlight";

import { Row, Col } from "antd";
import PageComponent from "../../components/PageComponent";
import Wrapper from "../../components/Wrapper";
import ListJobVertical from "./components/ListJobVertical";
import ListJobHorizontal from "./components/ListJobHorizontal";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <WrapperContent>
        <div className="business__light">
          <BusinessHighlight />
        </div>
        <div className="business__hot__job">
          <HotJobs />
        </div>
      </WrapperContent>

      <Wrapper>
        <Blog />
      </Wrapper>
      <Wrapper>
        <ListJobHorizontal />
      </Wrapper>
      <Wrapper>
        <ListJobVertical />
      </Wrapper>
    </>
  );
};

export default Home;

const WrapperContent = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .business__light {
    width: 60%;
  }
  .business__hot__job {
    width: 40%;
  }

  @media screen and (max-width: 700px) {
    .business__light {
      width: 100%;
    }
    .business__hot__job {
      width: 100%;
    }
  }
`;
