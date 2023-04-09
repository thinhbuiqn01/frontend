import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../api/axiosClient";
import styled from "styled-components";

const colors = [
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterApprove, setFilterApprove] = useState([]);
  const [filterUnApprove, setFilterUnApprove] = useState([]);
  const [isStatus, setIsStatus] = useState(true);
  const { currentUser, userToken } = useStateContext();
  useEffect(() => {
    if (userToken && currentUser.role === 4) {
      getData();
    }
  }, []);

  const getData = async () => {
    const response = await axiosClient.get("jobs");
    setJobs(response.data.jobs);
    // const filterSortApprove = response.data.jobs.filter((item) => {
    //   return item.status == false;
    // });
    // const filterSortUnApprove = response.data.jobs.filter((item) => {
    //   return item.status == false;
    // });
    // setFilterUnApprove(filterSortUnApprove);
    // setFilterApprove(filterSortApprove);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, data, index) => {
        return <span key={index}>{index + 1}</span>;
      },
    },
    {
      title: "Tên công việc",
      dataIndex: "name_job",
      key: "id",
    },
    {
      title: (
        <>
          {isStatus ? (
            <button onClick={() => setIsStatus((pre) => !pre)}>Đã duyệt</button>
          ) : (
            <button onClick={() => setIsStatus((pre) => !pre)}>
              Chưa duyệt
            </button>
          )}
        </>
      ),
      dataIndex: "status",
      key: "id",
      render: (_, record, index) => {
        return (
          <>
            {record.status ? (
              <Tag key={index} color="green">
                Đã duyệt
              </Tag>
            ) : (
              <Tag key={index} color="gold">
                Chưa duyệt
              </Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Công nghệ",
      dataIndex: "tech_using",
      key: "id",
      render: (_, data, index) => {
        const tech = JSON.parse(data.tech_using);
        const formatTech = tech.map((t, index) => {
          return t.label;
        });
        return (
          <>
            {formatTech.map((t, index) => (
              <Tag
                key={index}
                color={colors[Math.floor(Math.random() * colors.length)]}
              >
                {t}
              </Tag>
            ))}
          </>
        );
      },
    },
  ];

  const handleSearch = () => {
    let toUpSearch = search.toUpperCase();
    const filterJobs = jobs.filter((job) => {
      let nameSearch = job.name_job.toUpperCase();
      let techSearch = job.tech_using.toUpperCase();
      return nameSearch.includes(toUpSearch) || techSearch.includes(toUpSearch);
    });
    setJobs(filterJobs);
  };

  return (
    <div>
      <Input>
        <input
          type="text"
          placeholder="Tìm kiếm"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={(e) => handleSearch(e)}>Tìm kiếm</button>
      </Input>

      <Table columns={columns} dataSource={jobs} />
    </div>
  );
};

export default Index;

const Input = styled.div`
  padding: 10px 0%;
  width: 40%;
  display: flex;
  input {
    border-radius: 4px 0 0 4px;

    width: 80%;
    border: 1px solid #5ab0db;
  }
  input[type="text"]:focus {
    outline: none;
    border-radius: 4px 0 0 4px;

    box-shadow: 0px 0px 5px #61c5fa;
    border: 1px solid #5ab0db;
  }
  input[type="text"]:focus:hover {
    border-radius: 4px 0 0 4px;
    outline: none;
    box-shadow: 0px 0px 5px #61c5fa;
    border: 1px solid #5ab0db;
  }
  button {
    width: 20%;
    border: 1px solid #5ab0db;
    border-radius: 0 4px 4px 0;
  }
`;
