import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Divider, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [size, setSize] = useState("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employer, setEmployer] = useState(false);
  const [isDev, setIsDev] = useState(true);
  const [isEmp, setIsEmp] = useState(false);
  const [informationLogin, setInformationLogin] = useState({
    status: "",
    message: "",
  });

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
        setInformationLogin({ status: data.status, message: data.message });
      })
      .catch((e) => {
        setInformationLogin({
          status: e.response.data.status,
          message: e.response.data.message,
        });

        //setInformationLogin(false);
      });
  };

  return (
    <PageComponent title="Trang đăng nhập">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className=" text-center font-bold tracking-tight text-gray-600">
                  Đăng nhập tài khoản của bạn
                </h2>
              </div>
              <div>
                {" "}
                {informationLogin.status == "" ? (
                  ""
                ) : (
                  <Alert
                    message={informationLogin.message}
                    type={informationLogin.status}
                    showIcon
                    action={
                      <Button size="small" type="text">
                        {informationLogin.status == "success" ? (
                          <Link to={"/"}>Đến trang chủ</Link>
                        ) : (
                          ""
                        )}
                      </Button>
                    }
                    closable
                  />
                )}
              </div>
              <form
                className="mt-8 space-y-6"
                method="POST"
                onSubmit={(e) => handleOnSubmitLoginEmployer(e)}
              >
                <input type="hidden" name="remember" defaultValue="true" />
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

                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/dang-ky"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Đăng ký
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageComponent>
  );
};

export default Login;
