import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import MenuBusiness from "../components/Business/Menu";
import PageComponent from "../components/PageComponent";
import { useStateContext } from "../context/ContextProvider";
const avatar = `https://joesch.moe/api/v1/random?key=1`;

const Jobs = () => {
  const { currentUser } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState();
  const [jobs, setJobs] = useState([]);
  const [jobsConfirm, setJobsConfirm] = useState([]);
  const [jobsNonConfirm, setJobsNonConfirm] = useState([]);
  const items = [
    {
      key: "1",
      label: `Công việc`,
      children: <ListJobComponent data={jobs} />,
    },
    {
      key: "2",
      label: `Đã được duyệt`,
      children: <ListJobComponent data={jobsConfirm} />,
    },
    {
      key: "3",
      label: `Chưa được duyệt`,
      children: <ListJobComponent data={jobsNonConfirm} />,
    },
  ];
  useEffect(() => {
    const getData = async () => {
      const businessInfo = await axiosClient.get(`business/${currentUser.id}`);
      const jobsInfo = await axiosClient.get(
        `jobs/${businessInfo.data.business.id}`
      );
      setJobs(jobsInfo.data.jobs);
      const confirm = jobsInfo.data.jobs.filter((job) => job.status == 1);
      const nonConfirm = jobsInfo.data.jobs.filter((job) => job.status == 0);
      setJobsConfirm(confirm);
      setJobsNonConfirm(nonConfirm);
      setLoading(true);
    };
    getData();
  }, []);
  return (
    <PageComponent title={<MenuBusiness />}>
      {loading == false ? (
        <Spin />
      ) : (
        <Tabs defaultActiveKey="1" items={items} />
      )}
    </PageComponent>
  );
};

const ListJobComponent = ({ data }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
      footer={<div></div>}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          /* actions={[
    <IconText
      icon={StarOutlined}
      text="156"
      key="list-vertical-star-o"
    />,
    <IconText
      icon={LikeOutlined}
      text="156"
      key="list-vertical-like-o"
    />,
    <IconText
      icon={MessageOutlined}
      text="2"
      key="list-vertical-message"
    />,
  ]} */
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={avatar} />}
            title={
              <Link to={`/doanh-nghiep/cong-viec/${item.id}`} state={item}>
                {item.name_job}
              </Link>
            }
            description={item.tech_using}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};

export default Jobs;
