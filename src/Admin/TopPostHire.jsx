import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Input } from "./Students";
import TableManage from "../components/TableManage";
import Loading from "../components/Loading";
import { CSVLink } from "react-csv";
import { Button, Space } from "antd";
import styled from "styled-components";
import { useStateContext } from "../context/ContextProvider";

const TopPostHire = () => {
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "name_job",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
    },

    {
      title: "Số lượng ứng tuyển",
      dataIndex: "count",
    },

    {
      title: "",
      render: (_, record, index) => (
        <Space
          size="middle"
          onClick={(e) => {
            handleExportFile(record);
          }}
          key={index}
        >
          <Button>Export</Button>
        </Space>
      ),
    },
  ];
  const [topStudentHire, setTopStudentHire] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosClient
      .get("top-hire-post")
      .then((res) => {
        const filterData = res.data.sort((a, b) => b.count - a.count);
        setTopStudentHire(filterData);
        setFilter(filterData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    let toUpSearch = search.toUpperCase();
    const filterUsers = topStudentHire?.filter((user) => {
      let nameSearch = user.name.toUpperCase();
      return nameSearch.includes(toUpSearch);
    });
    setFilter(filterUsers);
  };
  const [dataStudent, setDataStudent] = useState([]);
  const refCv = useRef();
  const handleExportFile = async (record) => {
    await axiosClient
      .get(`export-top-job-hire/${record?.job_id}`)
      .then((res) => {
        const data = res.data.map((item, index) => {
          return {
            ...item,
            stt: index + 1,
          };
        });
        setDataStudent(data);
        const timeOut = setTimeout(() => {
          refCv.current.link.click();
          addHistory(record?.job_id);
          clearTimeout(timeOut);
        }, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { currentUser } = useStateContext();
  const addHistory = async (idJob) => {
    await axiosClient.post("history/add", {
      content: `${currentUser.name} - ${currentUser.id} Đã export thông tin bài viết: ${idJob}`,
      user_id: currentUser.id,
    });
  };

  const csvData = [
    {
      label: "STT",
      key: "stt",
    },
    {
      label: "Tên công việc",
      key: "name_job",
    },
    {
      label: "Tên sinh viên",
      key: "name_student",
    },
    {
      label: "Email sinh viên",
      key: "email_student",
    },

    {
      label: "Ngày Ứng tuyển",
      key: "ngayUngTuyen",
    },
    {
      label: "Ngày Đăng",
      key: "ngayDang",
    },
    {
      label: "Địa điểm làm việc",
      key: "location",
    },
    {
      label: "Email công ty",
      key: "email_give",
    },
  ];
  const csvDataFilter = [
    {
      label: "STT",
      key: "stt",
    },
    {
      label: "Tên công việc",
      key: "name_job",
    },
    {
      label: "Địa điểm",
      key: "location",
    },
    {
      label: "Ngày Đăng",
      key: "ngayDang",
    },
    {
      label: "Số lượng ứng tuyển",
      key: "count",
    },
  ];
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white p-4 rounded-md">
          <h3 className="font-semibold">Danh sách sinh viên</h3>
          <div className="relative flex justify-between">
            {" "}
            <Input>
              <input
                type="text"
                placeholder="Tìm kiếm"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={(e) => handleSearch(e)}>Tìm kiếm</button>{" "}
            </Input>
            <div>
              {
                <Button type="primary" danger>
                  <CSVLink
                    data={filter}
                    headers={csvDataFilter}
                    filename="post.csv"
                  >
                    Export dữ liệu
                  </CSVLink>
                </Button>
              }
            </div>
            <DisplayNone>
              {dataStudent.length > 0 && (
                <Button type="primary" danger>
                  <CSVLink
                    ref={refCv}
                    data={dataStudent}
                    headers={csvData}
                    filename="post.csv"
                  >
                    Xuất file
                  </CSVLink>
                </Button>
              )}
            </DisplayNone>
          </div>
          <TableManage columns={columns} dataSources={filter} />
        </div>
      )}
    </div>
  );
};

export default TopPostHire;

export const DisplayNone = styled.div`
  display: none;
`;
