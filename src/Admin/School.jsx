import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import TableManage from "../components/TableManage";
import { useStateContext } from "../context/ContextProvider";
const { confirm } = Modal;

const School = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState([]);
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
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/");
    }
  }, []);

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
        <Link to="/admin/nha-truong/them">
          <Button type="primary" ghost>
            Thêm tài khoản cho nhà trường
          </Button>
        </Link>
        <div style={{ marginBottom: "20px" }}></div>
        <>
          {loading == false ? (
            <div style={{ width: "700px", height: "300px", margin: "0 auto" }}>
              <Spin />
            </div>
          ) : (
            <TableManage columns={columns} dataSources={school} />
          )}
        </>
      </div>
    </>
  );
};

export default School;
