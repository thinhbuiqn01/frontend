import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { Spin } from "antd";

import axiosClient from "../../../api/axiosClient";
import HireInformation from "./HireInformation";
import TabContent from "./TabContent";

const Hire = () => {
  const params = useParams();
  const [business, setBusiness] = useState();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosClient
      .get(`business-job/${params.idBusiness}`)
      .then((res) => {
        setJobs(res.data.jobs);
        setBusiness(res.data.business);
        setLoading(true);
      })
      .catch((err) => {});
  };
  return (
    <>
      {loading ? (
        <>
          <Wrapper>
            <>
              <div className="content">
                <HireInformation business={business} />
                <TabContent loading={loading} jobs={jobs} business={business} />
              </div>
              <div className="information">
                <ul className="information__data">
                  <li>
                    <h3>Website</h3>
                    <div>- {business.link_website}</div>
                  </li>
                  <li>
                    <h3>Trụ sở</h3>
                    <div>- {business.location}</div>
                  </li>
                  <li>
                    <h3>Qui mô</h3>
                    <div>- {business.scales}</div>
                  </li>
                  <li>
                    <h3>Ngành nghề</h3>
                    <div>- {business.task}</div>
                  </li>
                  <li>
                    <h3>Đãi ngộ</h3>
                    <ul>
                      <li>Lương tháng 13</li>
                      <li>Du lịch công ty</li>
                      <li>Tài trợ học phí chứng chỉ hành nghề</li>
                      <li>Bảo hiểm sức khỏe và tai nạn 24/7</li>
                      <li>Từ thứ 2 tới thứ 6</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </>
          </Wrapper>
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Hire;

const Wrapper = styled.div`
  width: 80%;
  margin: 40px auto;
  display: flex;

  .content {
    width: 78%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    padding: 10px 10px 10px 20px;
    margin: 1%;
  }
  .information {
    width: 20%;

    margin: 1%;
    &__data {
      border-radius: 8px;
      padding: 10px 10px 10px 20px;

      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    ul {
      li {
        margin-top: 10px;

        ul {
          padding: 0 10px;
          li {
          }
        }
      }
    }
    h3 {
      font-weight: 600;
    }
  }
`;
