import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ItemVertical from "./ItemVertical";

const ListJobVertical = ({ jobs, setJobs, loading }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loading ? (
        <>
          {jobs.map((job) => (
            <ItemVertical key={job.id} job={job} />
          ))}
          {jobs.map((job) => (
            <ItemVertical key={job.id} job={job} />
          ))}
          {jobs.map((job) => (
            <ItemVertical key={job.id} job={job} />
          ))}
          {jobs.map((job) => (
            <ItemVertical key={job.id} job={job} />
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListJobVertical;
