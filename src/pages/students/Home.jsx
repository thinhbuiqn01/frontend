import React, { useEffect, useState } from "react";
import HotJobs from "../../components/HotJobs";
import BusinessHighlight from "./components/BusinessHighlight";

import ListJobVertical from "./components/ListJobVertical";
import ListJobHorizontal from "./components/ListJobHorizontal";
import styled from "styled-components";
import axiosClient from "../../api/axiosClient";
import ListCardBusiness from "../../components/listcard/ListCardBusiness";

const Home = () => {
  const [jobsHorizontal, setJobsHorizontal] = useState([]);

  const [jobsVertical, setJobsVertical] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosClient
      .get("/jobs-full")
      .then((res) => {
        setJobsHorizontal(res.data.slice(0, 8));
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axiosClient
      .get("/jobs-confirm")
      .then((res) => {
        setJobsVertical(res.data.jobs);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <WrapperContent>
        <div className="business__light">
          <BusinessHighlight />
        </div>
        <div className="business__hot__job">
          <HotJobs />
        </div>
      </WrapperContent>

      <WrapperContent>
        <h2>Công ty hàng đầu</h2>
        <ListCardBusiness />
      </WrapperContent>
      <WrapperContent>
        <h2>Công việc hàng đầu</h2>

        <ListJobHorizontal
          loading={loading}
          jobs={jobsHorizontal}
          setJobs={setJobsHorizontal}
        />
      </WrapperContent>
      <WrapperContent>
        <h2>Công việc hàng đầu</h2>

        <ListJobVertical
          loading={loading}
          jobs={jobsVertical}
          setJobs={setJobsVertical}
        />
      </WrapperContent>
    </>
  );
};

export default Home;

const WrapperContent = styled.div`
  width: 80%;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  .business__light {
    width: 60%;
  }
  .business__hot__job {
    width: 40%;
  }

  h2 {
    padding-top: 16px;
    font-size: 1.3rem;
    font-weight: bold;
  }

  @media screen and (max-width: 700px) {
    .business__light {
      width: 100%;
    }
    .business__hot__job {
      width: 100%;
    }
  }
`;
