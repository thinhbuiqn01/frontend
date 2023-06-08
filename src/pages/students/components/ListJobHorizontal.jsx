import React from "react";
import styled from "styled-components";
import ItemHorizontal from "./ItemHorizontal";
import Loading from "../../../components/Loading";

const ListJobHorizontal = ({ jobs, setJobs, loading }) => {
  const isFormat = jobs.filter((job) => job.status === 1).slice(0, 8);
  return (
    <Wrapper>
      {loading ? (
        <>
          {isFormat?.map((job, index) => (
            <ItemHorizontal key={index} loading={loading} job={job} />
          ))}
        </>
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

export default ListJobHorizontal;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
