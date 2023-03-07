import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const SchoolCreate = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();
  useEffect(() => {
    axiosClient
      .post("users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(e);
      });
  }, []);
  const handleSubmit = () => {
    if (name == null || email == null || phone == null) {
      messageApi.info("Vui lòng nhập đầy đủ thông tin!");
    } else {
      const validate = users.some((user) => {
        return user.email == email;
      });
      if (validate === true) {
        messageApi.info("Email đã được sử dụng");
      } else {
        const newAccountSchool = async () => {
          const data = await axiosClient.post("create-account-school", {
            name,
            email,
            password: "abc01234",
            role: 2,
            status: 1,
            phone,
          });
          if (data.status == 200) {
            messageApi.success("Tạo tài khoản thành công");
            navigate("/admin/nha-truong");
            setName("");
            setEmail("");
            setPhone("");
          }
        };
        newAccountSchool();
      }
    }
  };
  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <form action="">
        {contextHolder}
        <div style={{ margin: "10px 0" }}>
          <label>Tên</label>
          <Input
            size="default"
            placeholder="Chức vụ"
            value={name}
            prefix={<UserOutlined />}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label>Địa chỉ email</label>
          <Input
            size="default"
            placeholder="Địa chỉ email"
            value={email}
            prefix={<MailOutlined />}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label>Số điện thoại</label>
          <Input
            size="default"
            placeholder="Số điện thoại"
            value={phone}
            prefix={<PhoneOutlined />}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <Button type="primary" onClick={handleSubmit} ghost>
            Thêm tài khoản
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SchoolCreate;
