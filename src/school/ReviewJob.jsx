import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";
import Job from "./jobs/Job";
import Loading from "../components/Loading";

const ReviewJob = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState();

  useEffect(() => {
    getJob(params.idJob);
  }, []);
  const getJob = async (idJob) => {
    try {
      const res = await axiosClient.get(`job/${idJob}`);
      setJob(res.data.job);
      setLoading(true);
    } catch (error) {}
  };
  return (
    <PageComponent>
      <>{loading ? <Job job={job} setJob={setJob} /> : <Loading />} </>
    </PageComponent>
  );
};

export default ReviewJob;
