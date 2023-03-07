import { RadioGroup } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import PageComponent from "../components/PageComponent";

const Job = () => {
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState();
  const params = useParams();

  useEffect(() => {
    axiosClient
      .get(`job/${params.idJob}`)
      .then((res) => {
        setJob(res.data.job);
        console.log(res.data.job);
      })
      .catch((err) => {
        console.log(e);
      });
  }, []);
  console.log(params.idJob);
  return (
    <PageComponent>
      <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
        {job.name}
        <div>
          <h3 className="text-sm font-medium text-gray-900">Mô tả công việc</h3>

          <div className="space-y-6">
            <p className="text-base text-gray-900">{job.description}</p>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-900">
            Yêu cầu công việc
          </h3>

          <div className="mt-4">{job.require_job}</div>
        </div>
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">Details</h2>

          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-600">{job.description}</p>
          </div>
        </div>
      </div>
    </PageComponent>
  );
};

export default Job;
