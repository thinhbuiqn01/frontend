import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";
import Job from "./jobs/Job";
import { Spin } from "antd";

const ReviewJob = () => {
  const params = useParams(); 
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState();

  useEffect(() => {
    getJob(params.idJob);
  }, []);
  const getJob = async (idJob) => {
    const res = await axiosClient.get(`job/${idJob}`);
    setJob(res.data.job); 
    setLoading(true);
  };
  console.log(job);
  return (
    <PageComponent>
      <>{loading ? <Job job={job} /> : <Spin />} </>
    </PageComponent>
  );
};

export default ReviewJob;
