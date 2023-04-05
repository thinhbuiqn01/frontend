import React from "react";
import styled from "styled-components";

import { host } from "../../../utils/APIRoutes";

const HireInformation = ({ business }) => {
  return (
    <Wrapper>
      <div className="image">
        <img src={`${host}/uploads/${business.image}`} alt="" />
      </div>
      <div className="detail">
        <div className="name">{business.name}</div>
        <div className="description">{business.description}</div>
      </div>
    </Wrapper>
  );
};

export default HireInformation;

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #d7d7d7;
  .image {
    width: 200px;
    img {
      width: 100%;
    }
  }
  .detail {
    padding: 40px 10px;
    width: 100%;
    .name {
      width: 60%;
      font-size: 1.3rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
