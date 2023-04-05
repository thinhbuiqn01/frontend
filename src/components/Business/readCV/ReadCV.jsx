import React, { useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import styled from "styled-components";
import { host } from "../../../utils/APIRoutes";

const ReadCV = ({ data }) => {
  return (
    <Wrapper>
      <div className="view-cv" style={{}}>
        <iframe
          title="pdf"
          width="100%"
          height="600px"
          src={`${host}/pdf/${data.cv}`}
        ></iframe>
      </div>
    </Wrapper>
  );
};

export default ReadCV;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;

  .view-cv {
    width: 80%;
    margin: 0 auto;
    padding: 40px 0;
    border: 1px solid rgba(0, 0, 0, 0.3);
    height: 750px;
  }
`;
