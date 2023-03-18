import React from "react";
import HotJobs from "../../components/HotJobs";
import Blog from "./Blog";
import BusinessHighlight from "./components/BusinessHighlight";

import { Row, Col } from "antd";
import PageComponent from "../../components/PageComponent";
import Wrapper from "../../components/Wrapper";
import ListJobVertical from "./components/ListJobVertical";

const Home = () => {
  return (
    <div>
      <PageComponent>
        <Row>
          <Col span={16}>
            <BusinessHighlight />
          </Col>
          <Col span={8}>
            <HotJobs />
          </Col>
        </Row>
      </PageComponent>

      <Wrapper>
        <Blog />
      </Wrapper>
      <Wrapper>
        <ListJobVertical />
      </Wrapper>
    </div>
  );
};

export default Home;
