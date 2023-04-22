import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ReadCV from "./ReadCV";

const ListHireBusiness = ({ job }) => {
  const [recruitmentList, setRecruitmentList] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosClient
      .get(`hire/jobs/business/${job.id}`)
      .then((res) => {
        setRecruitmentList(res.data);
        setLoading(true);
      })
      .catch((err) => {});
  };
  return (
    <div>
      

      {loading
        ? recruitmentList.map((recruitment) => (
            <ReadCV key={recruitment.id} data={recruitment} />
          ))
        : ""}
    </div>
  );
};

export default ListHireBusiness;
