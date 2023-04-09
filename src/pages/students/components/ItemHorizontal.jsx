import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import ConvertDescription from "../../../components/ConvertDescription";

import h1 from "../../../assets/images/swiper/h1.jpg";
import { host } from "../../../utils/APIRoutes";

const ItemHorizontal = ({ job }) => {
  console.log(job);
  return (
    <Wrapper>
      <Link to={`/nha-tuyen-dung/${job.business_id}`}>
        <div className="image">
          <img src={job.image ? `${host}/uploads/${job.image}` : h1} />
        </div>
        <div className="info">
          <div className="info__name">{job.name_job.toUpperCase()}</div>
          <div className="info__location">{job.location}</div>
          <div className="info__description">{job.description}</div>
          <div className="info__require_job">
            <ConvertDescription data={job.require_job} />{" "}
          </div>
          <div className="info__time">{job.updated_at.slice(0, 10)}</div>
        </div>
      </Link>
    </Wrapper>
  );
};

export default ItemHorizontal;

const Wrapper = styled.div`
  width: 23%;

  height: 400px;
  margin: 1%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  margin: 1%;
  position: relative;
  border-radius: 5px;
  .image {
    margin: 0 auto;
    padding: 10px;
    width: 50%;
    img {
      width: 100%;
    }
  }
  .info {
    width: 80%;
    margin: 0 auto;
    padding: 0 0 40px 0;

    &__name {
      font-size: 1.2rem;
      font-weight: 600;
    }
    &__location {
    }

    &__description {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      -webkit-line-clamp: 2;
    }
    &__time {
      bottom: 10px;
      right: 10px;
      color: #3675f5;
      position: absolute;
    }
  }

  @media only screen and (max-width: 1000px) {
    width: 30%;
  }
  @media only screen and (max-width: 700px) {
    width: 46%;
  }
  @media only screen and (max-width: 450px) {
    width: 98%;
  }
`;
