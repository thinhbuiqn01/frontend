import React from "react";
import styled from "styled-components";
import h1 from "../../../assets/images/swiper/h1.jpg";

const ItemHorizontal = ({ job }) => {
  return (
    <Wrapper>
      <div className="image">
        <img src={h1} />
      </div>
      <div className="info">
        <div className="info__name">{job.name_job.toUpperCase()}</div>
        <div className="info__location">{job.location}</div>
        <div className="info__description">{job.description}</div>
        <div className="info__require_job">{job.require_job}</div>
        <div className="info__time">{job.updated_at.slice(0, 10)}</div>
      </div>
    </Wrapper>
  );
};

export default ItemHorizontal;

const Wrapper = styled.div`
  width: 23%;
  margin: 1%;
  position: relative;
  border: 1px solid #000;
  .image {
    margin: 0 auto;
    width: 50%;
    img {
      width: 100%;
    }
  }
  .info {
    width: 80%;
    margin: 0 auto;
    padding: 40px 0;

    &__name {
      font-size: 1.2rem;
      font-weight: 600;
    }
    &__location {
    }
    &__time {
      bottom: 10px;
      right: 10px;
      color: #3675f5;
      position: absolute;
    }
  }

  @media only screen and (max-width: 800px) {
    width: 30%;
  }
  @media only screen and (max-width: 600px) {
    width: 46%;
  }
  @media only screen and (max-width: 450px) {
    width: 98%;
  }
`;
