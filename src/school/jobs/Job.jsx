import {
  CheckIcon,
  ExclamationCircleOutlined,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Modal } from "antd";
import axiosClient from "../../api/axiosClient";
const { confirm } = Modal;

const Job = (props) => {
  console.log(props.job);
  const [description, setDescription] = useState(
    props.job?.description.split("\n") || []
  );
  const [techs, setTechs] = useState(JSON.parse(props.job.tech_using) || []);
  console.log(techs);
  const handleUpdateStatusJob = (e) => {
    e.preventDefault();
    if (props.job.status == 0) {
      showConfirm();
    }
  };
  const reviewJob = async () => {
    const res = await axiosClient.post(`job-status-edit/${props.job.id}`, {
      status: 1,
    });
    if (res.status == 200) {
      const res1 = await axiosClient.post(`job-delete-inform`, {
        job_id: props.job.id,
        role_take: 2,
      });
      console.log(res1);
    }
    console.log(res);
  };
  const showConfirm = () => {
    confirm({
      title: "Bạn có chắc chắc phê duyệt bài viết này không?",

      content: "Khi phê duyệt sinh viên sẽ được xem bài viết",
      okText: "No",
      okType: "danger",
      cancelText: "Yes",
      onOk() {},
      onCancel() {
        reviewJob();
      },
    });
  };
  return (
    <div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                {props.job.name_job}
              </h3>
              {/*  */}
              <p className="mt-6 text-base leading-7 text-gray-600"></p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  Mô tả công việc
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {description.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {/*  */}
              <p className="mt-6 text-base leading-7 text-gray-600"></p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  Yêu cầu công việc
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {techs.map((tech, index) => (
                  <li key={index} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {tech.label}
                  </li>
                ))}
              </ul>
              {/*  */}
              <p className="mt-6 text-base leading-7 text-gray-600"></p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  Địa điểm làm việc
                </h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                <li className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {props.job.location}
                </li>
              </ul>
              {/*  */}
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">
                    Ngày đăng: {props.job.created_at.slice(0, 10)}
                  </p>

                  <a
                    href="#"
                    onClick={handleUpdateStatusJob}
                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {props.job.status ? "Đã duyệt" : "Duyệt"}
                  </a>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Duyệt bài đăng để sinh viên có thể apply vào công việc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
