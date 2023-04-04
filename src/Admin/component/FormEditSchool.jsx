import { UserOutlined } from "@ant-design/icons";
import { Button, Select, Space } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

const FormEditSchool = ({ data }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const handleSubmitEditSchool = (e) => {
    e.preventDefault();
    axiosClient
      .post(`admin/user/${data.id}/update`, {
        name,
        phone,
        email,
      })
      .then((res) => {
        navigate("/admin/nha-truong");
      });
  };
  return (
    <Form>
      <label>Tên phòng ban</label>
      <input
        type="text"
        placeholder={data.name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        placeholder={data.email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Phone</label>
      <input
        type="number"
        placeholder={data.phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label>Trạng thái hoạt động</label>
      <Space> 
        <Select
          defaultValue={data.status ? "Đang hoạt động" : "Tạm khóa"}
          style={{
            width: 180,
            padding: "8px 0",
          }}
          size="large"
          onChange={""}
          options={[
            {
              label: "Đang hoạt động",
              value: 1,
            },
            {
              label: "Tạm khóa",
              value: 0,
            },
          ]}
        />
      </Space>
      <span className="button__submit">
        <Button size="large" danger onClick={(e) => handleSubmitEditSchool(e)}>
          Sửa
        </Button>
      </span>
    </Form>
  );
};

export default FormEditSchool;

const Form = styled.form`
  label {
    display: block;
    padding: 10px 0 0 0;
  }
  input {
    display: block;
    margin: 10px 0;
    line-height: 1rem;

    border: 1px solid #333;
    width: 100%;
    border-radius: 6px;
    padding: 10px 8px;
  }
  .button__submit {
    margin: 0 20px;
  }
`;
