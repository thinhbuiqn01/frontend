import React, { useEffect, useState } from "react";

import hallCompany from "../assets/images/hallCompany.jpg";

import axiosClient from "../api/axiosClient";
import { Spin } from "antd";
import { ListJobUser } from "../components/Job";
import { host } from "../utils/APIRoutes";
import Loading from "../components/Loading";
const BusinessView = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [infoBusiness, setInfoBusiness] = useState(null);

  useEffect(() => {
    axiosClient.get(`get-info/${data?.user.id}`).then((res) => {
      if (res.data.status == "success") {
        setInfoBusiness(res.data.data);
        setLoading(true);

        return res.data.data.id;
      } else {
        setInfoBusiness(null);
      }
    });
  }, []);
  return (
    <>
      {loading === false ? (
        <Loading />
      ) : (
        <>
          {infoBusiness !== null ? (
            <>
              <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <svg
                    className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                      </pattern>
                    </defs>
                    <svg
                      x="50%"
                      y={-1}
                      className="overflow-visible fill-gray-50"
                    >
                      <path
                        d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                        strokeWidth={0}
                      />
                    </svg>
                    <rect
                      width="100%"
                      height="100%"
                      strokeWidth={0}
                      fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                    />
                  </svg>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                  <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                      <div className="lg:max-w-lg">
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          {infoBusiness?.name}
                        </h1>
                        <p className="mt-6 text-xl leading-8 text-gray-700">
                          {infoBusiness?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                      style={{ width: "100%" }}
                      src={
                        `${host}/uploads/${infoBusiness?.image}` || hallCompany
                      }
                      className="shadow-2xl rounded-lg"
                    />
                  </div>
                  {/* right */}
                  <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                      <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                        <ul
                          role="list"
                          className="mt-8 space-y-8 text-gray-600"
                        >
                          <li className="flex gap-x-3">
                            <span>
                              <strong className="font-semibold text-gray-900">
                                Quy mô công ty
                              </strong>{" "}
                              {infoBusiness?.scales}
                            </span>
                          </li>
                          <li className="flex gap-x-3">
                            <span>
                              <strong className="font-semibold text-gray-900">
                                Lĩnh vực
                              </strong>{" "}
                              {infoBusiness?.task}
                            </span>
                          </li>
                          <li className="flex gap-x-3">
                            <span>
                              <strong className="font-semibold text-gray-900">
                                Trụ sở
                              </strong>{" "}
                              {infoBusiness?.location}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ListJobUser businessId={infoBusiness?.id} />
            </>
          ) : (
            "Hiện chưa có thông tin về công ty"
          )}
        </>
      )}
    </>
  );
};

export default BusinessView;
