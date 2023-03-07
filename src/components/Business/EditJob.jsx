import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageComponent from "../PageComponent";

const { TextArea } = Input;
const EditJob = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = Form.useForm();
  const [name, setName] = useState(state.name_job);
  const [techUsing, setTechUsing] = useState(state.tech_using);
  const [requireJob, setRequireJob] = useState(state.require_job);
  const [description, setDescription] = useState(state.description);
  const [locationWork, setLocationWork] = useState(state.location);
  const [emailGiveCV, setEmailGiveCV] = useState(state.email_give);

  const handleEditJob = () => {
    const editJob = async () => {
      const response = await axiosClient.post(`job-edit/${state.id}`, {
        tech_using: techUsing,
        require_job: requireJob,
        name_job: name,
        description: description,
        location: locationWork,
        email_give: emailGiveCV,
      });
      if (response.status == 200) {
        navigate("/doanh-nghiep/cong-viec");
        alert("Cập nhật thành thông tin thành công");
      }
    };
    editJob();
  };

  return (
    <PageComponent title="Chỉnh sửa thông tin đăng tuyển">
      <div>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên công việc"
            required
            tooltip="Trường này là bắt buộc"
          >
            <Input
              placeholder="Tên công việc"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Công nghệ sử dụng"
            required
            tooltip="Trường này là bắt buộc"
          >
            <Input
              placeholder="Công nghệ sử dụng"
              defaultValue={techUsing}
              onChange={(e) => setTechUsing(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Yêu cầu công việc"
            required
            tooltip="Trường này là bắt buộc"
          >
            <Input
              placeholder="Yêu cầu công việc"
              defaultValue={requireJob}
              onChange={(e) => setRequireJob(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả công việc"
            required
            tooltip="Trường này là bắt buộc"
          >
            <TextArea
              rows={4}
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextArea>
          </Form.Item>
          <Form.Item
            label="Địa điểm làm việc"
            required
            tooltip="Trường này là bắt buộc"
          >
            <Input
              placeholder="Địa điểm làm việc"
              defaultValue={locationWork}
              onChange={(e) => setLocationWork(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email nhận cv"
            required
            tooltip="Trường này là bắt buộc"
          >
            <Input
              placeholder="Email nhận cv"
              defaultValue={emailGiveCV}
              onChange={(e) => setEmailGiveCV(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" danger block onClick={handleEditJob}>
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageComponent>
  );
};

export default EditJob;
