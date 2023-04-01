import React, { useEffect, useState } from "react";
import ListJobHorizontal from "../../pages/students/components/ListJobHorizontal";
import axiosClient from "../../api/axiosClient";

const ListJob = ({ businessId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getJobById();
  }, []);
  const getJobById = () => {
    axiosClient.get(`job-by-id-business/${businessId}`).then((res) => {
      setJobs(res.data);
      setLoading(true);
    });
  };
  console.log(jobs);

  return (
    <>
      <ListJobHorizontal loading={loading} jobs={jobs} />
    </>
  );
};

export default ListJob;
