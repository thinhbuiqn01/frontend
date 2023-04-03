import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axiosClient from "../../api/axiosClient";
import ListJobHorizontal from "./components/ListJobHorizontal";
import SearchData from "../../components/SearchData";
import { useStateContext } from "../../context/ContextProvider";

const PageSearch = () => {
  const { search } = useStateContext();
 
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosClient
      .get("jobs-full")
      .then((res) => {
        let toUpSearch = search.toUpperCase();
        const filterJobs = res.data.filter((job) => {
          let nameSearch = job.name_job.toUpperCase();
          return nameSearch.includes(toUpSearch);
        });
        setJobs(filterJobs);
        setLoading(true);
      })
      .catch();
  }, [search]);
  console.log(jobs);
  return (
    <Wrapper>
      <ListJobHorizontal jobs={jobs} loading={loading} />
    </Wrapper>
  );
};

export default PageSearch;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
