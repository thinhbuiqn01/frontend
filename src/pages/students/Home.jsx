import React, { useEffect, useState } from "react";
import HotJobs from "../../components/HotJobs";
import Blog from "./Blog";
import BusinessHighlight from "./components/BusinessHighlight";

import Wrapper from "../../components/Wrapper";
import ListJobVertical from "./components/ListJobVertical";
import ListJobHorizontal from "./components/ListJobHorizontal";
import styled from "styled-components";
import SearchData from "../../components/SearchData";
import axiosClient from "../../api/axiosClient";

const Home = () => {
  const [jobsHorizontal, setJobsHorizontal] = useState([]);

  const [jobsVertical, setJobsVertical] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    axiosClient
      .get("/jobs-full")
      .then((res) => {
        setJobsHorizontal(res.data);
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

      <Wrapper>
        <Blog />
      </Wrapper>
      <Wrapper>
        <ListJobHorizontal
          loading={loading}
          jobs={jobsHorizontal}
          setJobs={setJobsHorizontal}
        />
      </Wrapper>
      <Wrapper>
        <ListJobVertical
          loading={loading}
          jobs={jobsVertical}
          setJobs={setJobsVertical}
        />
      </Wrapper>
    </>
  );
};

export default Home;

const WrapperContent = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .business__light {
    width: 60%;
  }
  .business__hot__job {
    width: 40%;
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
