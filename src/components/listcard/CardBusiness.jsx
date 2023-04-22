import React from "react";
import styled from "styled-components";
import h3 from "../../assets/images/swiper/h3.jpg";
import { host } from "../../utils/APIRoutes";
const CardBusiness = ({ business }) => {
  return (
    <Card>
      <div className="card__image">
        <img src={business.image ? `${host}/uploads/${business.image}` : h3} />
      </div>
      <div className="content">
        <h3 className="content__name">{business.name}</h3>
        <div className="content__description"> {business.description}</div>
        <div className="content__number">
          {business.total_job} Bài tuyển dụng
        </div>
      </div>
    </Card>
  );
};

export default CardBusiness;

const Card = styled.div`
  width: 23%;
  position: relative;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 1%;
  padding: 1px;
  .card__image {
    width: 50%;
    margin: 0 auto;
    padding-top: 20px;
    vertical-align: middle;
    img {
      border: 0;
      width: 100%;
      display: block;
    }
  }
  .content {
    padding: 20px 20px 40px;
    height: 200px;
    &__name {
      font-size: 1.3rem;
      font-weight: 600;
    }
    &__description {
      max-height: 58px;
      margin-top: 12px;
      font-size: 1.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__number {
      position: absolute;
      bottom: 10px;
      right: 10px;

      animation: flicker 0.5s infinite;

      @keyframes flicker {
        0% {
          color: red;
        }
        50% {
          color: black;
        }
      }
    }
  }

  @media only screen and (max-width: 1200px) {
    width: 31.33%;
  }
  @media only screen and (max-width: 1000px) {
    width: 48%;
  }
  @media only screen and (max-width: 700px) {
    width: 99%;
  }
`;
