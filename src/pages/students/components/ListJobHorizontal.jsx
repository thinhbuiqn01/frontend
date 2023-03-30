import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ItemHorizontal from "./ItemHorizontal";
const ListJobHorizontal = ({ jobs, setJobs, loading }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loading ? (
        <>
          {jobs.map((job) => (
            <ItemHorizontal job={job} />
          ))}
          {jobs.map((job) => (
            <ItemHorizontal job={job} />
          ))}
          <>
            {jobs.map((job) => (
              <ItemHorizontal job={job} />
            ))}
          </>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListJobHorizontal;
