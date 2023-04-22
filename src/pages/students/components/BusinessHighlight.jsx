import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ThunderboltTwoTone } from "@ant-design/icons";
import { Carousel, Spin } from "antd";
import axiosClient from "../../../api/axiosClient";
import company from "../../../assets/images/company.jpg";
import TitleComponent from "../../../components/TitleComponent";

const BusinessHighlight = () => {
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  useEffect(() => {
    axiosClient
      .get("business-hot")
      .then((response) => {
        setBusinesses(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <TitleComponent title="Công ty nỖi bật" size="20px" />
      <>
        {loading == false ? (
          <Spin />
        ) : (
          <>
            <Carousel autoplay>
              {businesses.map((item) => (
                <div key={item.id}>
                  <Wrapper>
                    <div className="image">
                      <img src={company} alt="company" />
                    </div>
                    <div className="details">
                      <TitleComponent title={item.name} />
                      <div className="description">{item.description}</div>
                      <div className="address">{item.location}</div>
                      <div className="jobs">
                        {item.total_job} job <ThunderboltTwoTone />
                      </div>
                    </div>
                  </Wrapper>
                </div>
              ))}
            </Carousel>
          </>
        )}
      </>
    </>
  );
};

export default BusinessHighlight;

const Wrapper = styled.div`
  display: flex;

  .image {
    width: 300px;
    margin: 0 10px 0 0;
    img {
      width: 300px;
      height: 280px;
    }
  }
  .details {
    margin: 0 0 0 10px;
    position: relative;
    .description {
      font-size: 16px;
      font-style: italic;
    }
    .address {
      margin-top: 20px;
      font-size: 16px;
    }
    .jobs {
      position: absolute;
      bottom: 10px;
      color: #f34e4e;
      left: 0;
      font-size: 16px;
    }
  }
`;
