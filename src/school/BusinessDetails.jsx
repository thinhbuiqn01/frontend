import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import BusinessView from "../pages/BusinessView";
import { Button } from "antd";
import axiosClient from "../api/axiosClient";

const BusinessDetails = () => {
  const state = useLocation();
  const [statusAccount, setStatusAccount] = useState(state.state.user.status);

  const handleAccountClose = async (e, id) => {
    const data = await axiosClient.post(`account-close/${id}`);
    console.log(data);
    setStatusAccount(data.data.user.status);
  };
  const handleAccountOpen = async (e, id) => {
    const data = await axiosClient.post(`account-open/${id}`);
    setStatusAccount(data.data.user.status);
  };
  return (
    <PageComponent title={"Chi tiết doanh nghiệp"}>
      <div style={{ marginBottom: "40px" }}>
        {statusAccount === 0 ? (
          <Button
            onClick={(e) => handleAccountOpen(e, state.state.user.id)}
            outline
            style={{ marginBottom: "8px", float: "right" }}
          >
            Duyệt tài khoản
          </Button>
        ) : (
          <Button
            onClick={(e) => handleAccountClose(e, state.state.user.id)}
            outline
            danger
            style={{ marginBottom: "8px", float: "right" }}
          >
            Đóng tài khoản
          </Button>
        )}
      </div>

      <BusinessView data={state.state} />
    </PageComponent>
  );
};

export default BusinessDetails;
