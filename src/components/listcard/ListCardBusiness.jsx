import React, { useEffect, useState } from "react";
import CardBusiness from "./CardBusiness";
import styled from "styled-components";
import axiosClient from "../../api/axiosClient";
import { Spin } from "antd";

const ListCardBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosClient
      .get("/admin/businesses")
      .then((res) => {
        setBusinesses(res.data);
        setLoading(true);
      })
      .catch((err) => {});
  };
  return (
    <Wrapper>
      {loading ? (
        businesses.map((business) => (
          <CardBusiness key={business.id} business={business} />
        ))
      ) : (
        <Spin />
      )}
    </Wrapper>
  );
};

export default ListCardBusiness;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;
