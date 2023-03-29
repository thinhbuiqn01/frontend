import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ItemVertical from "./ItemVertical";

const ListJobVertical = () => {
  useEffect(() => {
    axiosClient
      .get("/jobs-confirm")
      .then((res) => {
        setJobs(res.data.jobs);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loading
        ? jobs.map((job) => <ItemVertical key={job.id} job={job} />)
        : ""}
    </div>
  );
};

export default ListJobVertical;
