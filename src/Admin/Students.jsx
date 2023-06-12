import { Select, Space, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TableManage from "../components/TableManage";
import { useStateContext } from "../context/ContextProvider";
import Loading from "../components/Loading";
import styled from "styled-components";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Tên sinh viên",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (_, record, index) => (
      <Space size="middle" key={record.id}>
        <Tag color={record.status ? "green" : "red"}>
          {record.status ? "Hoạt động" : " Tạm khóa"}
        </Tag>
      </Space>
    ),
  },
  {
    title: "Hành động",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle" key={record.id}>
        <Link to={"/admin/sinh-vien/xem"} state={{ user: record }}>
          Xem
        </Link>
      </Space>
    ),
  },
];
const kData = ["19", "20", "21"];
const cityData = {
  19: ["1", "2", "3"],
  20: ["1", "2"],
};
const Students = () => {
  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { userToken, currentUser } = useStateContext();

  useEffect(() => {
    if (userToken && currentUser.role === 4) {
      axiosClient
        .post("users")
        .then((res) => {
          const data = res.data.users?.filter((i) => {
            return i.role == 1;
          });
          setUsers(data);
          setUsersFilter(data);
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/");
    }
  }, []);

  const handleSearch = (e) => {
    let toUpSearch = search.toUpperCase();
    const filterUsers = users?.filter((user) => {
      let nameSearch = user.name.toUpperCase();
      return nameSearch.includes(toUpSearch);
    });
    setUsersFilter(filterUsers);
  };

  const [cities, setCities] = useState(cityData[kData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[kData[0]][0]);
  const [oldK, setOldK] = useState();
  const handleProvinceChange = (value) => {
    setOldK(value);
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
    const filterUsers = users?.filter((user) => {
      let schoolYear = user.email.slice(0, 2);
      if (schoolYear === value) {
        return user;
      }
    });
    setUsersFilter(filterUsers);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
    const filterUsers = users?.filter((user) => {
      let classSchool = user.email.slice(9, 11);
      let schoolYear = user.email.slice(0, 2);
      let formatValue;
      if (value < 10) {
        formatValue = "0" + value;
      } else {
        formatValue = value;
      }
      if (classSchool === formatValue && schoolYear === oldK) {
        return user;
      }
    });
    setUsersFilter(filterUsers);
  };

  return (
    <>
      {loading == false ? (
        <div style={{ width: "700px", height: "300px", margin: "0 auto" }}>
          <Loading />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md">
          <h3 className="font-semibold">Danh sách sinh viên</h3>
          <div className="relative">
            {" "}
            <Input>
              <input
                type="text"
                placeholder="Tìm kiếm"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={(e) => handleSearch(e)}>Tìm kiếm</button>{" "}
              <div className="absolute right-0 top-1 gap-2">
                <Space wrap>
                  <Select
                    defaultValue={kData[0]}
                    style={{
                      width: 120,
                    }}
                    onChange={handleProvinceChange}
                    options={kData?.map((k) => ({
                      label: `Khóa ${k}`,
                      value: k,
                    }))}
                  />
                  <Select
                    style={{
                      width: 120,
                    }}
                    value={secondCity}
                    onChange={onSecondCityChange}
                    options={cities?.map((c) => ({
                      label: `Lớp T${c}`,
                      value: c,
                    }))}
                  />
                </Space>
              </div>
            </Input>
          </div>
          <TableManage columns={columns} dataSources={usersFilter} />
        </div>
      )}
    </>
  );
};

export default Students;

export const Input = styled.div`
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
