import React, { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import axiosClient from "../api/axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { setCurrentUser, currentUser, setUserToken, userToken } =
    useStateContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState({ __html: "" });
  let navigate = useNavigate();
  useEffect(() => {
    if (currentUser && userToken) {
      navigate("/");
    }
  }, [currentUser, userToken]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError({ __html: "" });
    axiosClient
      .post("/signup", {
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        // navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <PageComponent title="Đăng ký">
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
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tên nhà tuyển dụng"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none   border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
              <div>
                <input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  autoComplete="current-password-confirm"
                  required
                  className="relative block w-full rounded-b-md appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Nhập lại mật khẩu"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/dang-nhap"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Đăng Ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageComponent>
  );
};

export default Signup;
