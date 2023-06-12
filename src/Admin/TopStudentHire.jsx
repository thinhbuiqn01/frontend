import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../api/axiosClient";
import Loading from "../components/Loading";
import TableManage from "../components/TableManage";
import { Input } from "./Students";
import { Button, Space } from "antd";
import { CSVLink } from "react-csv";
import { DisplayNone } from "./TopPostHire";
import { useStateContext } from "../context/ContextProvider";

const TopStudentHire = () => {
  const columns = [
    {
      title: "Tên sinh viên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số lần ứng tuyển",
      dataIndex: "count",
    },
    {
      title: " ",
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
  const [search, setSearch] = useState("");
  const [exportFilter, setExportFilter] = useState([]);

  useEffect(() => {
    axiosClient
      .get("topStudentHire")
      .then((res) => {
        const filterData = res.data.sort((a, b) => b.count - a.count);
        const crD = new Date();
        setTopStudentHire(filterData);
        const expFilter = filterData.map((item, index) => {
          return {
            ...item,
            stt: index + 1,
            ngayCapNhat:
              crD.getDate() +
              "/" +
              (crD.getMonth() + 1) +
              "/" +
              crD.getFullYear() +
              " @ " +
              crD.getHours() +
              ":" +
              crD.getMinutes() +
              ":" +
              crD.getSeconds(),
          };
        });

        setExportFilter(expFilter);
        setFilter(filterData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [dataStudent, setDataStudent] = useState([]);
  const refCv = useRef();
  const handleExportFile = async (record) => {
    await axiosClient
      .get(`export-top-student-hire/${record?.user_id}`)
      .then((res) => {
        const filSet = res.data.map((item) => {
          return {
            ...item,
            status: item.status ? "Đã duyệt" : "Chưa duyệt",
          };
        });
        setDataStudent(filSet);

        const timeOut = setTimeout(() => {
          refCv.current.link.click();
          addHistory(record?.user_id);
          clearTimeout(timeOut);
        }, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { currentUser } = useStateContext();
  const addHistory = async (idUser) => {
    await axiosClient.post("history/add", {
      content: `${currentUser.name} - ${currentUser.id} Đã export thông tin user id: ${idUser}`,
      user_id: currentUser.id,
    });
  };

  const csvData = [
    {
      label: "Tên sinh viên",
      key: "name_student",
    },
    {
      label: "Email sinh viên",
      key: "email_student",
    },
    {
      label: "Tên công việc",
      key: "name_job",
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
      label: "Trạng thái",
      key: "status",
    },
  ];

  const csvDataFilter = [
    {
      label: "STT",
      key: "stt",
    },
    {
      label: "Tên sinh viên",
      key: "name",
    },
    {
      label: "Email sinh viên",
      key: "email",
    },
    {
      label: "Ngày cập nhật",
      key: "ngayCapNhat",
    },
    {
      label: "Số lần ứng tuyển",
      key: "count",
    },
  ];

  const handleSearch = (e) => {
    let toUpSearch = search.toUpperCase();
    const filterUsers = topStudentHire?.filter((user) => {
      let nameSearch = user.name.toUpperCase();
      return nameSearch.includes(toUpSearch);
    });
    setFilter(filterUsers);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white p-4 rounded-md">
          <h3 className="font-semibold">Danh sách sinh viên</h3>
          <div className="flex justify-between">
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
              <Button type="primary" danger>
                <CSVLink
                  data={exportFilter}
                  headers={csvDataFilter}
                  filename="student.csv"
                >
                  Export file
                </CSVLink>
              </Button>
            </div>
            <DisplayNone>
              {dataStudent.length > 0 && (
                <Button type="primary" danger>
                  <CSVLink
                    ref={refCv}
                    data={dataStudent}
                    headers={csvData}
                    filename="student.csv"
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

export default TopStudentHire;
