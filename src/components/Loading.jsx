import { Spin } from "antd";
import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingSpin>
      <div className="child">
        <Spin />
      </div>
    </LoadingSpin>
  );
};

export default Loading;

const LoadingSpin = styled.div`
  width: 20px;
  position: relative;
  left: 50%;
  height: 200px;
  transform: translateX(-50%);
  .child {
    position: absolute;
    width: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
