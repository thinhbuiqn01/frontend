import { CheckIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import axiosClient from "../../api/axiosClient";
import emailjs from "@emailjs/browser";

const { confirm } = Modal;

const Job = (props) => {
  const formRef = useRef({});
  const [description, setDescription] = useState(
    props.job?.description.split("\n") || []
  );
  const [techs, setTechs] = useState(JSON.parse(props.job.tech_using) || []);
  const [business, setBusiness] = useState();
  useEffect(() => {
    axiosClient.get(`business/${props.job.business_id}`).then((res) => {
      setBusiness(res.data.business);
    });
  }, []);

  const handleUpdateStatusJob = (e) => {
    e.preventDefault();
    if (props.job.status == 0) {
      showConfirm();
    }
  };

  const reviewJob = async () => {
    axiosClient
      .post(`job-status-edit/${props.job.id}`, {
        status: 1,
      })
      .then((res) => {
        props.setJob(res.data.job);
      })
      .then(() => {
        axiosClient.post(`job-delete-inform`, {
          job_id: props.job.business_id,
          role_take: 2,
        });
        emailjs
          .sendForm(
            "service_2phamrk",
            "template_7xpioma",
            formRef.current,
            "LOFR6vQG9zpxUvRSa"
          )
          .then(
            (result) => {
              alert(result.text);
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      })
      .then(() => {
        alert("Bài đăng đã được duyệt");
      });
  };
  const showConfirm = () => {
    confirm({
      title: "Bạn có chắc chắc phê duyệt bài viết này không?",
      content: "Khi phê duyệt sinh viên sẽ được xem bài viết",
      okText: "No",
      okType: "Yes",
      cancelText: "Yes",
      onOk() {},
      onCancel() {
        reviewJob();
      },
    });
  };
  return (
    <>
      <form ref={formRef} style={{ display: "none" }}>
        <input type="text" name="business_name" value={business?.name} />
        <input type="text" name="name_job" value={props.job.name_job} />
        <input type="text" name="address" value={props.job.location} />
        <input type="email" name="user_email" value={props.job.email_give} />
        <input type="submit" value="Send" />
      </form>
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
    </>
  );
};

export default Job;
