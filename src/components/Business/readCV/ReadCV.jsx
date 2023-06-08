import React, { useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import styled from "styled-components";
import { host } from "../../../utils/APIRoutes";
import axiosClient from "../../../api/axiosClient";

const ReadCV = ({ data, handleAcceptCV }) => {
  return (
    <Wrapper>
      <div className="view-cv">
        <iframe
          title="pdf"
          width="100%"
          height="600px"
          src={`${host}/pdf/${data.cv}`}
        ></iframe>
      </div>
      <Accept className="button-accept" onClick={() => handleAcceptCV(data)}>
        Phê duyệt{" "}
      </Accept>
    </Wrapper>
  );
};

export default ReadCV;

const Accept = styled.div`
  position: absolute;
  background-color: #f81b1b;
  padding: 4px 20px;
  border-radius: 8px;
  color: white;
  top: 20px;
  left: 0;
`;

const Wrapper = styled.div`
  position: relative;
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
