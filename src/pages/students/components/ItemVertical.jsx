import React from "react";
import styled from "styled-components";

import { DiffOutlined } from "@ant-design/icons";
import h1 from "../../../assets/images/swiper/h1.jpg";

const ItemVertical = ({ job, width }) => {
  return (
    <Wrapper>
      <div className="image">
        <img src={h1} alt="2312" />
      </div>
      <div className="content">
        <div className="title">{job.name_job}</div>
        <div className="location">{job.location}</div>
        <div className="icon">
          <DiffOutlined />
        </div>
        <div className="time">{job.updated_at.slice(0, 10)}</div>
      </div>
    </Wrapper>
  );
};

export default ItemVertical;

const Wrapper = styled.div`
  display: flex;
  width: 48%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin: 10px auto;

  &:hover {
    background-color: #d0e9fb;
  }

  .image {
    margin: 4px;
    width: 30%;
    position: relative;
    width: 120px;
    height: 82px;
    padding: 6px;
    display: inline-block;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: inline-block;
      background: #fff;
      padding: 7px;
    }
  }
  .content {
    width: 70%;

    margin: 10px;
    position: relative;
    .title {
      width: 70%;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 80%;
      text-transform: uppercase;
      white-space: nowrap;
      font-size: 18px;
      font-weight: 500;
    }
    .location {
      width: 80%;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
    }
    .icon {
      position: absolute;
      top: 0;
      right: 0;
    }
    .time {
      position: absolute;
      bottom: 8px;
      right: 10px;
    }
  }

  @media only screen and (max-width: 800px) {
 display: none;
  }

  @media only screen and (max-width: 450px) {
    width: 100%;
    margin: 10px auto;

    .content {
      .time {
        position: absolute;
        bottom: 2px;
        right: 4px;
      }
    }
  }
`;
