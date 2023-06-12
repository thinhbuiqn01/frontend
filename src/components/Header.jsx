import { BellOutlined, UserAddOutlined } from "@ant-design/icons";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge, Drawer, Space } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useStateContext } from "../context/ContextProvider";

import logo from "../assets/images/logo.png";

const roleStudent = [{ name: "PT HIRE", to: "/", current: true }];

const roleBusiness = [
  { name: "PT HIRE", to: "/", current: false },
  { name: "Công việc", to: "/doanh-nghiep/cong-viec", current: true },
];

const roleSchool = [
  { name: "PT HIRE UTE", to: "/", current: true },
  { name: "Sinh viên", to: "/truong/sinh-vien", current: false },
  { name: "Doanh nghiệp", to: "/truong/doanh-nghiep", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = ({ currentUser }) => {
  const { logout } = useStateContext();
  const [informs, setInforms] = useState([]);
  const [linkPage, setLinkPage] = useState("");
  const navigate = useNavigate();
  const Logout = (e) => {
    e.preventDefault();
    logout();
    setInforms([]);
    navigate("/dang-nhap");
  };
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  useEffect(() => {
    if (currentUser.role == 1) {
      return setLinkPage("sinh-vien/thong-bao");
    } else if (currentUser.role == 2) {
      return setLinkPage("truong/thong-bao");
    }
    if (currentUser.role == 3) {
      return setLinkPage("doanh-nghiep/thong-bao");
    } else {
      return setLinkPage("admin/thong-bao");
    }
  });
  useEffect(() => {
    if (currentUser.role == 1) {
      axiosClient
        .get(`inform/${currentUser.id}`)
        .then((data) => {
          setInforms(data.data.inform);
        })
        .catch((e) => console.log(e));
    } else if (currentUser.role == 2) {
      const getData = async () => {
        const informSchool = await axiosClient.get(`inform-job-school`);
        setInforms(informSchool.data.notification);
      };
      getData();
    }
  }, [currentUser.id]);

  const handleDeleteInform = async (e, id) => {
    e.preventDefault();
    const deleteInform = async () => {
      try {
        await axiosClient.delete(`delete-inform/${id}`);
        const filterD = informs.filter((item) => {
          if (item.id !== id) {
            return item;
          }
        });
        setInforms(filterD);
      } catch (error) {}
    };
    deleteInform();
  };

  return (
    <>
      <Drawer
        title={`Thông báo của ${currentUser?.name}`}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {informs?.map((inform) => (
                <li key={inform?.id} className="flex py-6">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={logo}
                      alt="informs"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          {currentUser.role == 2 ? (
                            <Link
                              to={`truong/cong-viec/duyet/${inform.job_id}`}
                            >
                              {inform?.name}
                            </Link>
                          ) : currentUser.role == 1 ? (
                            <Link to={`/cong-viec/${inform?.job_id}`}>
                              {inform?.name || inform.description}
                            </Link>
                          ) : currentUser?.role == 3 ? (
                            <Link
                              to={`doanh-nghiep/cong-viec/${inform?.job_id}`}
                            >
                              {inform.name}
                            </Link>
                          ) : (
                            ""
                          )}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Ngày đăng: {inform.created_at.slice(0, 10)}
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteInform(e, inform.id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={logo}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {(currentUser.role === 2
                        ? roleSchool
                        : currentUser.role == 1
                        ? roleStudent
                        : currentUser.role == 3
                        ? roleBusiness
                        : roleStudent
                      ).map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button onClick={showDrawer}>
                      <Space
                        size="middle"
                        style={{
                          margin: "0 20px 8px 0",
                        }}
                      >
                        <Badge
                          count={informs.length}
                          size="small"
                          overflowCount={2}
                          style={{ color: "white", marginRight: "10px" }}
                        >
                          <BellOutlined
                            size="large"
                            style={{
                              margin: "0 8px 0",
                              fontSize: "16px",
                              color: "white",
                            }}
                          />
                        </Badge>
                      </Space>
                    </button>

                    {/* Profile dropdown PC */}
                    {currentUser.name ? (
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>

                            <div className=" text-white">
                              {currentUser.name}
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <Link
                                to="/cai-dat"
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Cài đặt
                              </Link>
                            </Menu.Item>

                            {currentUser.role == 4 || currentUser.role == 2 ? (
                              ""
                            ) : (
                              <Menu.Item>
                                <Link
                                  state={{ currentUser }}
                                  to={
                                    currentUser.role === 3
                                      ? "/doanh-nghiep/ho-so"
                                      : "/ho-so"
                                  }
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Hồ sơ
                                </Link>
                              </Menu.Item>
                            )}

                            {currentUser.role == 4 ? (
                              <Menu.Item>
                                <Link
                                  to={"/admin"}
                                  state={{ currentUser }}
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Trang quản lý
                                </Link>
                              </Menu.Item>
                            ) : currentUser.role == 2 ? (
                              <Menu.Item>
                                <Link
                                  to={"/truong/doanh-nghiep"}
                                  state={{ currentUser }}
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Quản lý doanh nghiệp
                                </Link>
                              </Menu.Item>
                            ) : (
                              ""
                            )}
                            <Menu.Item>
                              {currentUser.name ? (
                                <Link
                                  to="/dang-xuat"
                                  onClick={(e) => Logout(e)}
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Đăng xuất
                                </Link>
                              ) : (
                                <Link
                                  to="/dang-nhap"
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  Đăng nhập
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <Link to="/dang-nhap">
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "white",
                          }}
                        >
                          <UserAddOutlined style={{ height: "24px" }} />
                        </span>
                      </Link>
                    )}
                    {/* PC */}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {roleStudent.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {currentUser.imageUrl ? (
                      <>
                        {console.log(currentUser)}
                        <img
                          className="h-8 w-8 rounded-full"
                          src={currentUser.imageUrl}
                          alt=""
                        />
                      </>
                    ) : (
                      <UserIcon className="w-6 text-white" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {currentUser.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {currentUser.email}
                    </div>
                  </div>

                  <Space size="small">
                    <Badge count={99} overflowCount={10}>
                      <BellOutlined />
                    </Badge>
                  </Space>
                </div>
                {/* Mobile  */}
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="Link"
                    to="cai-dat"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    <Link to="cai-dat">Cài đặt</Link>
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="Link"
                    href="/ho-so"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    <Link to="/ho-so">Hồ Sơ</Link>
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="Link"
                    to="dang-xuat"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {currentUser.name ? (
                      <Link to="/dang-nhap" onClick={(e) => Logout(e)}>
                        Đăng xuất
                      </Link>
                    ) : (
                      <Link to="/dang-nhap">Đăng nhập</Link>
                    )}
                  </Disclosure.Button>
                </div>
                {/*  */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Header;
