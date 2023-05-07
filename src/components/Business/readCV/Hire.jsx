import { Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosClient from "../../../api/axiosClient";
import { useStateContext } from "../../../context/ContextProvider";
import ListHireBusiness from "./ListHireBusiness";
import Loading from "../../Loading";

const Hire = () => {
  const { currentUser, userToken } = useStateContext();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (currentUser.role === 3 && userToken) {
      getData();
    }
  }, []);
  const getData = async () => {
    try {
      const businessInfo = await axiosClient
        .get(`business/${currentUser.id}`)
        .then((res) => {
          return res.data.business[0];
        });
      const jobsInfo = await axiosClient
        .get(`business/jobs/${businessInfo.id}`)
        .then((res) => {
          return res.data;
        });
      setJobs(jobsInfo);
      setLoading(true);
    } catch (error) {}
  };
  return (
    <Wrapper>
      {loading ? (
        <Tabs
          defaultActiveKey="1"
          centered
          items={jobs.map((job, i) => {
            return {
              label: `Bài đăng ${i + 1}`,
              key: i,
              children: (
                <>
                  <Info>
                    <div className="info-job">
                      <div className="info-name">{job.name_job}</div>
                      <div className="info-require">
                        <h3>Yêu cầu công việc</h3>
                        <ul>
                          {job.require_job.split("\n").map((i) => (
                            <li>- {i}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Info>

                  <ListHireBusiness job={job} />
                </>
              ),
            };
          })}
        />
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

export default Hire;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;

  .content {
    width: 100%;
    min-height: 200px;
  }
`;

const Info = styled.div`
  position: relative;

  .info-job {
    background-color: #c8fcc945;
    width: 20%;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    position: fixed;

    .info-name {
      text-transform: uppercase;
      color: red;

      font-size: 1.3rem;
      font-weight: 600;
    }
    .info-require {
      h3 {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
  }
`;
