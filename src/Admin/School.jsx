import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TableManage from "../components/TableManage";
import { useStateContext } from "../context/ContextProvider";
import Loading from "../components/Loading";
import styled from "styled-components";
const { confirm } = Modal;

const School = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState([]);
  const [schoolFilter, setSchoolFilter] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { userToken, currentUser } = useStateContext();
  useEffect(() => {
    if (userToken && currentUser.role === 4) {
      axiosClient
        .post("users")
        .then((res) => {
          const data = res.data.users?.filter((i) => {
            return i.role == 2;
          });
          setSchool(data);
          setSchoolFilter(data);
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
    const filterUsers = school?.filter((user) => {
      let nameSearch = user.name.toUpperCase();
      return nameSearch.includes(toUpSearch);
    });
    setSchoolFilter(filterUsers);
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Bạn có chắn chắn xóa tài khoản",
      icon: <ExclamationCircleFilled />,
      content: "Chọn 'Yes' Tài khoản sẽ bị xóa vĩnh viễn",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const handleDelete = async () => {
          const res = await axiosClient.post(`/admin/user/delete/${record.id}`);
          if (res.status == 200) {
            const filterUser = res.data.users?.filter((user) => {
              return user.role == 2;
            });
            setSchool(filterUser);
          }
        };
        handleDelete();
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Tài khoản",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          {record.status == 1 ? (
            <Tag color="#50d63e">Hoạt động</Tag>
          ) : (
            <Tag color="#f50">Tạm khóa</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle" key={record.id}>
          <Link
            to={`/admin/nha-truong/xem/${record.id}`}
            state={{ user: record }}
          >
            <Tag color="#2db7f5">Xem</Tag>
          </Link>
          <Link
            to={"/admin/nha-truong"}
            onClick={() => showDeleteConfirm(record)}
          >
            <Tag color="#f50">Xóa</Tag>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div>
        <h3 className="font-semibold">Danh sách tài khoản nhà trường</h3>
        <div style={{ marginBottom: "20px" }}></div>
        <>
          {loading == false ? (
            <div style={{ width: "700px", height: "300px", margin: "0 auto" }}>
              <Loading />
            </div>
          ) : (
            <>
              {" "}
              <div className="relative">
                <Input>
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button onClick={(e) => handleSearch(e)}>Tìm kiếm</button>{" "}
                </Input>
                <span className="absolute right-0 top-3">
                  <Link to="/admin/nha-truong/them">
                    <Button type="primary" ghost>
                      Thêm tài khoản cho nhà trường
                    </Button>
                  </Link>
                </span>
              </div>
              <TableManage columns={columns} dataSources={schoolFilter} />
            </>
          )}
        </>
      </div>
    </>
  );
};

export default School;

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
