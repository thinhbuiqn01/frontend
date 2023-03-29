import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ItemHorizontal from "./ItemHorizontal";
const ListJobHorizontal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosClient
      .get("/jobs-full")
      .then((res) => {
        setJobs(res.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loading ? (
        <>
          {jobs.map((job) => (
            <ItemHorizontal job={job} />
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListJobHorizontal;
