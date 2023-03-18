import React from "react";
import styled from "styled-components";

import h1 from "../../../assets/images/swiper/h1.jpg";

const ItemVertical = ({ props }) => {
  return (
    <Wrapper>
      <div className="image">
        <img src={h1} alt="2312" />
      </div>
      <div className="content">
        <div className="title">sdsds</div>
        <div className="location">312321</div>
        <div className="icon">3213</div>
        <div className="time">32đasadsadsad13</div>
      </div>
    </Wrapper>
  );
};

export default ItemVertical;

const Wrapper = styled.div`
  display: flex;
  border: 0.001em solid #c7c7c7;
  margin: 4px 10px;
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
      font-size: 18px;
      font-weight: 500;
    }
    .location {
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
`;
