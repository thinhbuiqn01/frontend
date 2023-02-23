import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../context/ContextProvider";
const color = {
  isActive: "bg-gray-800 text-white",
  noActive: "white",
};

const Login = () => {
  const { setCurrentUser, setUserToken, currentUser, userToken } =
    useStateContext();
  const title = "Chào mừng đến với HIRE PT";
  const [size, setSize] = useState("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employer, setEmployer] = useState(false);
  const [isDev, setIsDev] = useState(true);
  const [isEmp, setIsEmp] = useState(false);
  let navigate = useNavigate;

 
  const handleLoginEmp = (e) => {
    setEmployer(true);
    setIsEmp(true);
    setIsDev(false);
  };

  const handleLoginDev = (e) => {
    setEmployer(false);
    setIsEmp(false);
    setIsDev(true);
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
  };
  const handleOnSubmitLoginEmployer = (e) => {
    e.preventDefault();
    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((e) => {
        console.log(12);
      });
  };

  return (
    <PageComponent title={title}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
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
                    onClick={(e) => handleLoginGoogle(e)}
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
              <div>
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                  <div className="w-full max-w-md space-y-8">
                    <div>
                      <h2 className=" text-center font-bold tracking-tight text-gray-600">
                        Chào mừng nhà tuyển dụng
                      </h2>
                    </div>
                    <form
                      className="mt-8 space-y-6"
                      method="POST"
                      onSubmit={(e) => handleOnSubmitLoginEmployer(e)}
                    >
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
                      <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                          <label htmlFor="email-address" className="sr-only">
                            Email
                          </label>
                          <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Email "
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Mật khẩu
                          </label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Quên mật khẩu
                          </a>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Đăng nhập
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          {employer ? <>quang cao</> : <>a</>}
        </div>
      </div>
    </PageComponent>
  );
};

export default Login;
