import React from "react";
import ItemHorizontal from "./ItemHorizontal";
const ListJobHorizontal = ({ jobs, setJobs, loading }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loading ? (
        <>
          {jobs?.map((job) => (
            <ItemHorizontal key={Math.random()} job={job} />
          ))}
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default ListJobHorizontal;
