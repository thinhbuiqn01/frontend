import React, { useState } from "react";

import {
  Alert,
  Button,
  Col,
  Drawer,
  Form,
  Row,
  Space,
  message
} from "antd";

import axiosClient from "../../../api/axiosClient";
import { useStateContext } from "../../../context/ContextProvider";

const HireApply = ({ job, business, onClose, open }) => {
  const { currentUser } = useStateContext();

  const [PDF, setPDF] = useState();
  const [statusApply, setStatusApply] = useState(false);

  const [messageResponse, setMessageResponse] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const handleChangePDF = (e) => {
    const pdfArr = [];
    for (let i = 0; i < e.target.files.length; i++) {
      pdfArr.push(e.target.files[i]);
    }
    setPDF(pdfArr);
  };

  const handleSubmitApply = (e) => {
    if (PDF) {
      axiosClient
        .post("hire/upload", {
          user_id: currentUser.id,
          business_id: business.id,
          job_id: job.id,

          phone_student: currentUser.phone,
          name_student: currentUser.name,
          email_student: currentUser.email,

          status: 1,
        })
        .then((res) => {
          if (res.data.status == "error") {
            setMessageResponse(res.data.response.message);
            setStatusMessage(true);
          } else {
            const formData = new FormData();
            for (let i = 0; i < PDF.length; i++) {
              formData.append("images[]", PDF[i]);
            }
            axiosClient
              .post(`hire/upload/cv/${res.data.id}`, formData)
              .then((res) => {
                setStatusApply(true);
              });
          }
        })
        .catch((err) => {});
    } else {
      message.warning("Vui lòng chọn CV ");
    }
  };
  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose} danger>
              Thoát
            </Button>
            <Button onClick={(e) => handleSubmitApply()}>Ứng tuyển</Button>
          </Space>
        }
      >
        <Form layout="vertical">
          {statusApply ? (
            <>
              <Alert message="Ứng tuyển thành công" type="success" />
              {setTimeout(() => {
                setStatusApply(false);
              }, 5000)}
            </>
          ) : statusMessage ? (
            <>
              <Alert message={messageResponse} type="warning" />
              {setTimeout(() => {
                setStatusMessage(false);
              }, 5000)}
            </>
          ) : (
            ""
          )}
          <Row style={{ padding: 10 }}>
            <Col span={12}>
              Tên: <b>{currentUser.name}</b>
            </Col>
            <Col span={12}>
              Email: <b>{currentUser.email}</b>
            </Col>
          </Row>
          <Row style={{ padding: 10 }}>
            <Col span={12}>
              Số điện thoại: <b>{currentUser.phone}</b>
            </Col>
          </Row>
          <Row style={{ padding: 10 }}>
            <Col span={12}>
              Tên công ty: <b style={{ fontSize: "1.1rem" }}>{business.name}</b>
            </Col>
            <Col span={12}>
              Địa điểm: <b>{business.location}</b>
            </Col>
          </Row>
          <Row style={{ padding: 10 }}>
            <Col span={24}>
              Tên công việc:{" "}
              <b
                style={{
                  fontSize: "1.1rem",
                  textTransform: "uppercase",
                  color: "red",
                }}
              >
                {job.name_job}
              </b>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <input
                type="file"
                name="images"
                onChange={(e) => handleChangePDF(e)}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default HireApply;
