import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../api/axiosClient";
import Loading from "../components/Loading";
import TableManage from "../components/TableManage";
import { Input } from "./Students";
import { DisplayNone } from "./TopPostHire";
import { CSVLink } from "react-csv";
import { Button, Space } from "antd";
import { useStateContext } from "../context/ContextProvider";

const TopHireBusinesses = () => {
  const columns = [
    {
      title: "Tên công ty",
      dataIndex: "name",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
    },
    {
      title: "Số bài viết",
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
      .get("top-hire-business")
      .then((res) => {
        const crD = new Date();
        const filterData = res.data
          .sort((a, b) => b.count - a.count)
          .map((item, index) => {
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
      .get(`export-top-business-hire/${record?.business_id}`)
      .then((res) => {
        const data = res.data.map((item, index) => {
          return {
            ...item,
            stt: index + 1,
          };
        });
        setDataStudent(data);
        if (refCv.current) {
          const timeOut = setTimeout(() => {
            refCv.current.link.click();
            addHistory(record?.business_id);
            clearTimeout(timeOut);
          }, 0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { currentUser } = useStateContext();
  const addHistory = async (idBusiness) => {
    await axiosClient.post("history/add", {
      content: `${currentUser.name} - ${currentUser.id} Đã export thông tin công ty: ${idBusiness}`,
      user_id: currentUser.id,
    });
  };

  const csvData = [
    {
      label: "STT",
      key: "stt",
    },
    {
      label: "Tên công ty",
      key: "name",
    },
    {
      label: "Tên công việc",
      key: "name_job",
    },
    {
      label: "Đã ứng tuyển",
      key: "daUngTuyen",
    },
    {
      label: "Ngày Đăng",
      key: "ngayDang",
    },
    {
      label: "Địa điểm làm việc",
      key: "location",
    },
  ];
  const csvDataFilter = [
    {
      label: "STT",
      key: "stt",
    },
    {
      label: "Tên công ty",
      key: "name",
    },
    {
      label: "Địa điểm",
      key: "location",
    },
    {
      label: "Số bài viết",
      key: "count",
    },
    {
      label: "Ngày cập nhật",
      key: "ngayCapNhat",
    },
  ];

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white p-4 rounded-md">
          <h3 className="font-semibold">Danh sách công ty</h3>
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
              <Button type="primary" danger>
                <CSVLink
                  ref={refCv}
                  data={filter}
                  headers={csvDataFilter}
                  filename="post.csv"
                >
                  Xuất file
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

export default TopHireBusinesses;
