import { Avatar, Col, List, Row, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import MenuBusiness from "../../components/Business/Menu";
import HotJobs from "../../components/HotJobs";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../context/ContextProvider";
import styled from "styled-components";
import { host } from "../../utils/APIRoutes";
import Loading from "../../components/Loading";
const avatar = `https://joesch.moe/api/v1/random?key=1`;

const Jobs = () => {
  const { currentUser, userToken } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState();
  const [jobsConfirm, setJobsConfirm] = useState([]);
  const [jobsNonConfirm, setJobsNonConfirm] = useState([]);
  const navigate = useNavigate();
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
    if (currentUser.role == 3 && userToken) {
      getData();
    } else {
      navigate("/");
    }
  }, []);

  const getData = async () => {
    try {
      const businessInfo = await axiosClient
        .get(`business/${currentUser.id}`)
        .then((res) => {
          return res.data.business[0];
        });
      const jobsInfo = await axiosClient
        .get(`business/jobs/${businessInfo.id}`)
        .then((res) => {
          return res.data;
        });
      setJobs(jobsInfo);

      const confirm = jobsInfo.filter((job) => job.status == 1);
      const nonConfirm = jobsInfo.filter((job) => job.status == 0);
      setJobsConfirm(confirm);
      setJobsNonConfirm(nonConfirm);
      setLoading(true);
    } catch (error) {}
  };

  return (
    <PageComponent title={<MenuBusiness />}>
      {loading == false ? (
        <Loading />
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
  const [loading, setLoading] = useState();

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
    axiosClient
      .get(`business/${currentUser.id}`)
      .then((res) => {
        setBusiness(res.data.business[0]);
        setLoading(true);
      })
      .catch((err) => {});
  }, []);
  return loading ? (
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
  ) : (
    ""
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
