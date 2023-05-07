import React from "react";
import ItemVertical from "./ItemVertical";
import Loading from "../../../components/Loading";

const ListJobVertical = ({ jobs, setJobs, loading }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {loading ? (
        <>
          {jobs.slice(0, 6).map((job) => (
            <ItemVertical key={job.id} job={job} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ListJobVertical;
