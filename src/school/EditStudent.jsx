import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Button } from "antd";
import React, { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";

const status = [
  {
    id: 1,
    name: "Hoạt động",
    status: 1,
  },
  {
    id: 2,
    name: "Tạm khóa",
    status: 0,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const defaultPassword = "abc01234";
const EditStudent = () => {
  const { state } = useLocation();
  const [selected, setSelected] = useState(status[0]);
  const [edit, setEdit] = useState(false);
  const [phone, setPhone] = useState(state.user?.phone);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSaveEdit = (e) => {
    axiosClient
      .post(`/user/edit/${state.user.id}`, {
        name: state.user.name,
        email: state.user.email,
        password: password !== "" ? password : defaultPassword,
        phone: phone,
        status: selected.status,
      })
      .then((res) => {
        navigate(-1);
      })

      .catch((error) => {
        console.log(e);
      });
    setEdit(false);
  };
  console.log(state.user);
  return (
    <PageComponent title="Quản lý sinh viên">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {state.user?.name}
            <span style={{ float: "right" }}>
              {edit == true ? (
                <Button primary onClick={() => handleSaveEdit(state.user?.id)}>
                  Lưu
                </Button>
              ) : (
                <Button danger onClick={() => setEdit(true)}>
                  Chỉnh sửa
                </Button>
              )}
            </span>
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {state.user?.role == 1
              ? `Sinh viên khóa 20${state.user?.email.slice(0, 2)}`
              : state.user?.role == 2
              ? `Tham gia ngày ${state.user.created_at.slice(0, 10)}`
              : ""}
          </p>
        </div>
        <div className="border-t border-gray-200">
          <form>
            <dl>
              <div
                className={`${
                  edit ? "bg-gray-50" : "bg-white"
                } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {state.user?.email}
                </dd>
              </div>
              <div
                className={`${
                  edit == false ? "bg-gray-50" : "bg-white"
                } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"`}
              >
                <dt className="text-sm font-medium text-gray-500 ">
                  Số điện thoại
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {edit == false ? (
                    phone
                  ) : (
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  )}
                </dd>
              </div>
              {edit == false ? (
                ""
              ) : (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Mật khẩu
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </dd>
                </div>
              )}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Trạng thái tài khoản
                </dt>
                <dd
                  className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                  style={{ paddingBottom: "100px" }}
                >
                  {edit == false ? (
                    state.user?.status == 1 ? (
                      "Đang hoạt động"
                    ) : (
                      "Đang khóa"
                    )
                  ) : (
                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                              <span className="flex items-center">
                                <span className="ml-3 block truncate">
                                  {selected.name}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                {
                                  <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                }
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {status.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "text-white bg-indigo-600"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  )}
                </dd>
              </div>
            </dl>
          </form>
        </div>
      </div>
    </PageComponent>
  );
};

export default EditStudent;
