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

  const handleAcceptCV = async (cv) => {
    const data = {
      job_id: cv?.job_id,
      user_id: cv?.user_id,
      status: 1,
      description: "Hồ sơ của bạn đã được phê duyệt",
    };
    try {
      await axiosClient.post("hireStatusStudent", {
        user_id: cv?.user_id,
        job_id: cv?.job_id,
        id: cv?.id,
      });

      const filterList = recruitmentList.filter((item) => {
        if (item.id !== cv?.id) {
          return item;
        }
      });

      setRecruitmentList(filterList);

      await axiosClient.post("notifyAddOrUpdate", data);
    } catch (error) {}
  };

  return (
    <div>
      {loading
        ? recruitmentList.length == 0
          ? "Chưa có bài tuyển dụng nào"
          : recruitmentList.map((recruitment) => (
              <ReadCV
                handleAcceptCV={handleAcceptCV}
                key={recruitment.id}
                data={recruitment}
              />
            ))
        : ""}
    </div>
  );
};

export default ListHireBusiness;
