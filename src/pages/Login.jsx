import React, { useState } from "react";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";
import PageComponent from "../components/PageComponent";
import Form from "../components/Form";
const color = {
  isActive: "bg-gray-800 text-white",
  noActive: "white",
};

const Login = () => {
  const title = "Chào mừng đến với HIRE PT";
  const [size, setSize] = useState("default");
  const [employer, setEmployer] = useState(false);
  const [isDev, setIsDev] = useState(true);
  const [isEmp, setIsEmp] = useState(false);

  const handleLoginEmp = (e) => {
    e.preventDefault();
    setEmployer(true);
    setIsEmp(true);
    setIsDev(false);
  };

  const handleLoginDev = (e) => {
    e.preventDefault();
    setEmployer(false);
    setIsEmp(false);
    setIsDev(true);
  };

  return (
    <PageComponent title={title}>
      <Row>
        <Col
          xs={2}
          sm={4}
          md={6}
          lg={8}
          xl={10}
          style={{ border: "1px solid #6e6b6b" }}
        >
          <Row style={{ textAlign: "center" }}>
            <Col
              className={isDev ? color.isActive : "white"}
              span={12}
              style={{
                padding: "10px",
              }}
              onClick={(e) => handleLoginDev(e)}
            >
              Developer
            </Col>
            <Col
              className={isEmp ? color.isActive : "white"}
              span={12}
              style={{
                padding: "10px",
              }}
              onClick={(e) => handleLoginEmp(e)}
            >
              Employer
            </Col>
          </Row>
          {isDev ? (
            <>
              <Row>
                <Col span={24} style={{ padding: "10px", textAlign: "center" }}>
                  <Button
                    icon={<GoogleOutlined style={{ fontSize: "20px" }} />}
                    style={{ lineHeight: "20px" }}
                    size={size}
                  >
                    Đăng nhập bằng Google
                  </Button>{" "}
                </Col>
              </Row>
              <Divider plain style={{ padding: "0 30px" }}>
                or
              </Divider>
              <Row>
                <Col span={24} style={{ padding: "10px", textAlign: "center" }}>
                  <Button
                    icon={<GithubOutlined style={{ fontSize: "20px" }} />}
                    style={{ lineHeight: "20px" }}
                    size={size}
                  >
                    Đăng nhập bằng Githup
                  </Button>{" "}
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Form />
            </>
          )}
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={1}></Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={13}>
          {employer ? (
            <>
              <Form />
            </>
          ) : (
            <>a</>
          )}
        </Col>
      </Row>
    </PageComponent>
  );
};

export default Login;
