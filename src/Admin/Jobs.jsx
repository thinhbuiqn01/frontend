import React from "react";
import ListJob from "./component/ListJob";

const Jobs = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <h3 className="font-semibold">Danh sách công việc</h3>
      <ListJob />
    </div>
  );
};

export default Jobs;
