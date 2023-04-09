import React from "react";
import ListHistory from "./ListHistory";
import styled from "styled-components";

const Index = () => {
  return (
    <div className="grid grid-cols-5 mt-4 mb-4 ">
      <div className="col-span-3 mr-2 bg-white rounded-lg p-3 mt-4 sm:mt-0">
        <h3 className="p-4 font-semibold text-base">Lịch sử chỉnh hoạt động</h3>
        <ListHistory />
      </div>
      {/* <div className="col-span-2 ml-2 bg-white rounded-lg p-3 mb-4 sm:mb-0"></div> */}
    </div>
  );
};

export default Index;

const Wrapper = styled.div``;
