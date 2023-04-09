import React from "react";
import styled from "styled-components";
import { Progress, Space } from "antd";
const StatisticalItem = ({ title, total, percent, color }) => {
  return (
    <Content>
      <div className="content">
        <div className="d3">
          <Progress
            type="circle"
            strokeColor={{
              "0%": color[0],
              "100%": color[1],
            }}
            percent={Math.round((100 * total) / percent)}
            size={80}
          />
        </div>
        <div className="d7">
          <span>{total}</span>
          <div>{title}</div>
        </div>
      </div>
    </Content>
  );
};

export default StatisticalItem;

const Content = styled.div`
  width: 25%;  
  background-color: #fff;
  border-radius: 8px;
  .content {
    padding: 10px;
    display: flex;
    flex-direction: row;
    width: 100%;
    .d3 {
      width: 33%;
    }
    .d7 {
      margin: auto 0;
      width: 66%;
      font-weight: 700;
      span {
        padding-left: 60px;
        font-size: 1.5rem;
      }
      div {
        padding-left: 10px;
      }
    }
  }
`;
