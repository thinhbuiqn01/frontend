import { Avatar, Col, List, Row, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import MenuBusiness from "../../components/Business/Menu";
import HotJobs from "../../components/HotJobs";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../context/ContextProvider";
import styled from "styled-components";
import { host } from "../../utils/APIRoutes";
const avatar = `https://joesch.moe/api/v1/random?key=1`;

const Jobs = () => {
  const { currentUser } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState();
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
        <Wrapper>
          <div className="tabs">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
          <div className="list">
            <HotJobs />
          </div>
        </Wrapper>
      )}
    </PageComponent>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .tabs {
    width: 70%;
  }
  .list {
    width: 30%;
  }

  @media only screen and (max-width: 1000px) {
    .tabs {
      width: 100%;
    }
    .list {
      display: none;
      margin: 0 auto;
      width: 80%;
    }
  }
`;

const ListJobComponent = ({ data }) => {
  const { currentUser } = useStateContext();
  const [business, setBusiness] = useState(); 
  const handleConvertTech = (techUse) => {
    const convertArray = JSON.parse(techUse);
    const mergeTech = convertArray.map((item) => {
      return item.label;
    });
    const mergeTechToString = mergeTech.toString();
    const replayMergeTech = mergeTechToString.replace(/,/gi, ", ");
    return replayMergeTech;
  };
  useEffect(() => {
    axiosClient.get(`business/${currentUser.id}`).then((res) => {
      setBusiness(res.data.business); 
    });
  }, []);
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
          extra={
            <img
              width={272}
              alt="logo"
              src={`${host}/uploads/${business?.image}`}
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={`${host}/uploads/${business?.image}`} />}
            title={
              <Link to={`/doanh-nghiep/cong-viec/${item?.id}`} state={item}>
                {item.name_job}
              </Link>
            }
            description={(() => handleConvertTech(item.tech_using))()}
          />

          <div>
            <span>
              <ListRequireJob>{item.require_job}</ListRequireJob>
            </span>
          </div>
        </List.Item>
      )}
    />
  );
};

export default Jobs;
const ListRequireJob = ({ children }) => {
  const toArray = children.replace(/-/gi, "").split("\n");
  return (
    <>
      {toArray.map((item, index) => (
        <li key={index}>- {item}</li>
      ))}
    </>
  );
};
