import { ShareAltOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axiosClient from "../api/axiosClient";

const HotJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axiosClient
      .post("jobs-hot")
      .then((res) => {
        setJobs(res.data.jobs.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Wrapper style={{ width: "100%" }}>
      <h1>
        <span>Công việc</span> hot hôm nay
      </h1>
      <div className="content">
        <div className="list-job">
          {jobs.map((job) => (
            <div key={job.id} className="item-job">
              <h3> {job.name}</h3>
              <Link to={`/cong-viec/${job.id}`}>
                <h4> {job.name_job}</h4>
              </Link>
              <h5>Ứng tuyển ngay</h5>
              <span>
                <ShareAltOutlined />
              </span>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default HotJobs;

const Wrapper = styled.div`
  padding: 8px;
  h1 {
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    text-transform: capitalize;

    span {
      color: #e75757;
    }
  }

  .list-job {
    margin-top: 20px;
    .item-job {
      position: relative; 
      padding: 8px 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      border: 0.1px solid #cacaca;
      width: 100%;

      span {
        position: absolute;
        top: 16px;
        right: 10px;
      }

      h3,
      h4 {
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        color: #9c9c9c;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      h4 {
        color: #323232;

        &:hover {
          color: #e75757;
        }
      }
      h5 {
        font-size: 12px;
        color: #ff9090;
        text-decoration: underline;

        animation: autoColor 0.5s infinite;

        @keyframes autoColor {
          0% {
            color: red;
          }
          50% {
            color: black;
          }
        }
      }
    }
  }
`;
