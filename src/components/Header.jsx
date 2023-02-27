import React, { Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useStateContext } from "../context/ContextProvider";

import logo from "../assets/images/logo.png";
const roleStudent = [
  { name: "PT HIRE", to: "/", current: true },
  { name: "Việc làm IT", to: "viec-lam", current: false },
  { name: "Công ty IT", to: "cong-ty", current: false },
  { name: "Blog IT", to: "blog", current: false },
  { name: "Việc làm fresher", to: "fresher", current: false },
  { name: "Việc làm thực tập sinh", to: "thuc-tap-sinh", current: false },
];

const roleSchool = [
  { name: "PT HIRE UTE", to: "/trang-truong", current: true },
  { name: "Sinh viên", to: "/truong/sinh-vien", current: false },
  { name: "Doanh nghiệp", to: "/truong/doanh-nghiep", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = ({ currentUser }) => {
  const { logout } = useStateContext();

  const navigate = useNavigate();
  const Logout = (e) => {
    e.preventDefault();
    logout();
    navigate("/dang-nhap");
  };

  return (
    <>
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
                      {(currentUser.role === 2 ? roleSchool : roleStudent).map(
                        (item) => (
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
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown PC */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          {currentUser.imageUrl ? (
                            <>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={currentUser.imageUrl}
                                alt=""
                              />
                            </>
                          ) : (
                            <>
                              {currentUser.name ? (
                                <div className=" text-white">
                                  {currentUser.name}
                                </div>
                              ) : (
                                <UserIcon className=" text-white" />
                              )}
                            </>
                          )}
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

                          <Menu.Item>
                            <Link
                              to="/ho-so"
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              Hồ sơ
                            </Link>
                          </Menu.Item>

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
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
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
