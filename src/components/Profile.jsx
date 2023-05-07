import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Spin, Upload } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useStateContext } from "../context/ContextProvider";
import PageComponent from "./PageComponent";
import Loading from "./Loading";

const Profile = () => {
  const { currentUser } = useStateContext();

  const [infoProfile, setInfoProfile] = useState(null);
  const [nameCPN, setNameCPN] = useState("");
  const [scales, setScales] = useState("");
  const [description, setDescription] = useState("");
  const [linkWebsite, setLinkWebsite] = useState("");
  const [task, setTask] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`get-info/${currentUser.id}`)
      .then((res) => {
        if (res.data.status == "success") {
          setInfoProfile(res.data.data);
          setLoading(true);
        } else {
          setInfoProfile(null);
          setLoading(true);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  const handleSubmitInformBusiness = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("images[]", image[i]);
    // }
    formData.append("image", image);
    formData.append("name", nameCPN);
    formData.append("scales", scales);
    formData.append("description", description);
    formData.append("link_website", linkWebsite);
    formData.append("task", task);
    formData.append("status", 1);
    formData.append("location", location);
    formData.append("user_id", currentUser.id);

    axiosClient
      .post("extra-info", formData)
      .then((res) => {
        setInfoProfile(res.data);
        // axiosClient
        //   .post(`extra-info-image/${currentUser.id}`, formData)
        //   .then((res) => setInfoProfile(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleChangeImage = (e) => {
    // const imagesArray = [];
    // for (let i = 0; i < e.target.files.length; i++) {
    //   imagesArray.push(e.target.files[i]);
    // }
    setImage(e.target.files[0]);
  };

  return (
    <PageComponent title={"Hồ sơ "}>
      {loading ? (
        infoProfile == null && currentUser.role == 3 ? (
          <>
            <div>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Tạo hồ sơ công ty của bạn
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Thông tin này sẽ được hiển thị công khai, vì vậy hãy cẩn
                      thận với những gì bạn chia sẻ.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form onSubmit={(e) => handleSubmitInformBusiness(e)}>
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                      <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                          {/* tên công ty */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="Tên công ty"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Tên công ty
                            </label>
                            <input
                              type="text"
                              defaultValue={nameCPN}
                              onChange={(e) => setNameCPN(e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                          {/* tên công ty */}
                          {/* website */}
                          <div className="col-span-3 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Website
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                http://
                              </span>
                              <input
                                type="text"
                                defaultValue={linkWebsite}
                                onChange={(e) => setLinkWebsite(e.target.value)}
                                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="www.example.com"
                              />
                            </div>
                          </div>
                        </div>
                        {/* website */}
                        {/* mô tả */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Mô tả
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="about"
                              rows={3}
                              defaultValue={description}
                              onChange={(e) => setDescription(e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Mô tả về công ty của bạn"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Mô tả ngắn gọn cho công ty.
                          </p>
                        </div>
                        {/* mô tả */}
                        {/* Lĩnh vực */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="Lĩnh vực"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Lĩnh vực
                          </label>
                          <input
                            type="text"
                            defaultValue={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>{" "}
                        {/* Lĩnh vực */}
                        {/* Qui moo */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="Quy mô công ty"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Quy mô công ty
                          </label>
                          <select
                            id="state"
                            defaultValue={`5-20 Nhân viên`}
                            onChange={(e) => {
                              setScales(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="5-20 Nhân viên">
                              5-20 Nhân viên
                            </option>
                            <option value="20-100 Nhân viên">
                              20-100 Nhân viên
                            </option>
                            <option value="100-500 Nhân viên">
                              100-500 Nhân viên
                            </option>
                            <option value="Hơn 500 Nhân viên">
                              {" "}
                              Hơn 500 Nhân viên
                            </option>
                          </select>
                        </div>
                        {/* Qui moo */}
                        {/* Thành phố */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="Thành phố"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Trụ sở công ty
                          </label>
                          <select
                            id="state"
                            defaultValue={`Hà Nội`}
                            onChange={(e) => {
                              setLocation(e.target.value || "Hà Nội");
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                          </select>
                        </div>
                        {/* Thành phố */}
                        {/* hình ảnh */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Hình ảnh
                          </label>
                          <input
                            name="images[]"
                            type="file"
                            multiple
                            listType="picture-card"
                            className="avatar-uploader"
                            onChange={(e) => handleChangeImage(e)}
                          />
                        </div>
                        {/* hình ảnh */}
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Lưu
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
          </>
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                {currentUser?.name.toUpperCase()}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Thông tin</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email liên hệ
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {currentUser?.email}
                  </dd>
                </div>
                {infoProfile ? (
                  <>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Lĩnh vực
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {infoProfile?.task.toUpperCase()}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Trụ sở
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {infoProfile?.location}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Website
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <a href={`https://www.${infoProfile.link_website}`}>
                          {infoProfile?.link_website}
                        </a>
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {infoProfile?.description}
                      </dd>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {currentUser?.phone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )
      ) : (
        <Loading />
      )}
    </PageComponent>
  );
};

export default Profile;
