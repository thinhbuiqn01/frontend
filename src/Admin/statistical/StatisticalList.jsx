import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axiosClient from "../../api/axiosClient";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import StatisticalItem from "./StatisticalItem";
const color = ["#cf1322", "#fa8c16", "#52c41a", "#c41d7f", "#108ee9"];

const StatisticalList = () => {
  const [hired, setHired] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [students, setStudents] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { userToken, currentUser } = useStateContext();
  const navigate = useNavigate();

  const getHired = () => {
    axiosClient
      .get("hire")
      .then((res) => {
        setHired(res.data);
      })
      .catch((err) => {});
  };

  const getJobs = () => {
    axiosClient
      .get("jobs")
      .then((res) => {
        setJobs(res.data.jobs);
      })
      .catch((err) => {});
  };

  const getStudent = () => {
    axiosClient
      .post("users")
      .then((res) => {
        const studentsResult = res.data.users.filter((user) => {
          return user.role === 1;
        });
        const businessResult = res.data.users.filter((user) => {
          return user.role === 3;
        });
        setStudents(studentsResult);
        setBusinesses(businessResult);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (userToken && currentUser.role === 4) {
      getHired();
      getJobs();
      getStudent();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Wrapper>
      <StatisticalItem
        title={"Bài đăng"}
        total={jobs.length}
        percent={jobs.length * 1.2}
        color={[color[0], color[1]]}
      />
      <StatisticalItem
        title={"Công ty"}
        total={businesses.length}
        percent={businesses.length * 1.6}
        color={[color[1], color[2]]}
      />
      <StatisticalItem
        title={"Sinh viên"}
        total={students.length}
        percent={students.length * 1.3}
        color={[color[2], color[3]]}
      />
      <StatisticalItem
        title={"Tuyển dụng"}
        total={hired.length}
        percent={hired.length * 1.3}
        color={[color[3], color[4]]}
      />
    </Wrapper>
  );
};

export default StatisticalList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
