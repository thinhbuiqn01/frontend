import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import ItemHorizontal from "./ItemHorizontal";

const ListJobHorizontal = ({ jobs, setJobs, loading }) => {
  return (
    <Wrapper>
      {loading ? (
        <>
          {jobs?.map((job) => (
            <ItemHorizontal key={job.id} loading={loading} job={job} />
          ))}
        </>
      ) : (
        <Spin />
      )}
    </Wrapper>
  );
};

export default ListJobHorizontal;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
