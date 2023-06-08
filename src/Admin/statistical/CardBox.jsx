import React from "react";
import styled from "styled-components";
import bannerimg from "../../assets/images/bannerimg.png";
import { useStateContext } from "../../context/ContextProvider";
const CardBox = () => {
  const { currentUser } = useStateContext();
  return (
    <Wrapper>
      <div className="row-3">
        <img src={bannerimg} alt="" />
      </div>
      <div className="row-7">
        <h3>Chào mừng đến với trang quản lý</h3>
        <h2>{currentUser.name}</h2>
      </div>
    </Wrapper>
  );
};

export default CardBox;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  .row-3 {
    width: 30%;
    padding: 10px;

    img {
      width: 100%;
    }
  }

  .row-7 {
    width: 70%;
    padding: 10px;
    h3 {
      font-size: 20px;
      font-weight: 500;
    }
    h2 {
      font-size: 30px;
      font-weight: 600;
      color: blue;
    }

    p {
      max-width: 600px;
      font-size: 18px;
    }
  }
`;
