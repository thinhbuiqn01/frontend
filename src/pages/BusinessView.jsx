import React, { useState } from "react";
import PageComponent from "../components/PageComponent";

const BusinessView = () => {
  const [business, setBusiness] = useState({
    name: "",
    slug: "slug",
    description: "",
    website: "",
    image: "",
    image_url: "",
    jobs: [],
  });

  const HandleInfoChange = (e) => {
    e.preventDefault();
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    e.preventDefault();
    console.log(123);
  };
 

  return (
    <PageComponent title="Thêm công ty">
      <>
        {/*  */}
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Tạo hồ sơ công ty của bạn
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Thông tin này sẽ được hiển thị công khai, vì vậy hãy cẩn thận
                  với những gì bạn chia sẻ.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
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
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          onChange={(e) => HandleInfoChange(e)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      {/* tên công ty */}
                      {/* website */}
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                            http://
                          </span>
                          <input
                            type="text"
                            name="company-website"
                            id="company-website"
                            onChange={(e) => HandleInfoChange(e)}
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
                          name="about"
                          rows={3}
                          onChange={(e) => HandleInfoChange(e)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="Mô tả về công ty của bạn"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Mô tả ngắn gọn cho công ty của bạn.
                      </p>
                    </div>
                    {/* mô tả */}
                    {/* Thành phố */}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Thành phố"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Thành phố
                      </label>
                      <select
                        id="state"
                        name="state"
                        autoComplete="state-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option>Hà Nội</option>
                        <option>Đà Nẵng</option>
                        <option>Hồ Chí Minh</option>
                      </select>
                    </div>
                    {/* Thành phố */}

                    {/* hình ảnh */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Hình ảnh
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                onChange={onChangeImage}
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
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
    </PageComponent>
  );
};

export default BusinessView;
