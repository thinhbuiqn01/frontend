import { Col, Row } from "antd";
import React, { useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import ItemVertical from "./ItemVertical";

const ListJobVertical = () => {
  useEffect(() => {
    axiosClient
      .get("/jobs-confirm")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Row>
        <Col span={12}>
          <ItemVertical />
        </Col>
        <Col span={12}>
          <ItemVertical />
        </Col>
      </Row>
    </div>
  );
};

export default ListJobVertical;
