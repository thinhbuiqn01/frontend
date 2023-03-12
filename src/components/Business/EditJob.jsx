import { Button, Form, Input, Select, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import PageComponent from "../PageComponent";

const { TextArea } = Input;
const EditJob = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [name, setName] = useState(state.name_job);
  const [techUsing, setTechUsing] = useState(JSON.parse(state.tech_using));
  const [techUsingEdit, setTechUsingEdit] = useState();
  const [requireJob, setRequireJob] = useState(state.require_job);
  const [description, setDescription] = useState(state.description);
  const [locationWork, setLocationWork] = useState(state.location);
  const [emailGiveCV, setEmailGiveCV] = useState(state.email_give);

  const handleEditJob = () => {
    const editJob = async () => {
      const response = await axiosClient.post(`job-edit/${state.id}`, {
        tech_using: JSON.stringify(techUsingEdit),
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
  useEffect(() => {
    axiosClient
      .get("technologies")
      .then((res) => {
        console.log(res);
        setTechUsing(res.data.tech);
        setLoading(true);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (value, label) => {
    setTechUsingEdit(label);
  };

 
  const options = techUsing?.map((tech) => {
    return {
      value: tech.id,
      label: tech.name,
    };
  });

  return (
    <PageComponent title="Chỉnh sửa thông tin đăng tuyển">
      <div>
        {loading === false ? (
          <Spin />
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên công việc"
              required
              tooltip="Trường này là bắt buộc"
            >
              <TextArea
                placeholder="Tên công việc"
                defaultValue={name}
                rows={1}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Công nghệ sử dụng"
              required
              tooltip="Trường này là bắt buộc"
            >
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                }}
              >
                <Select
                  mode="multiple"
                  size={"middle"}
                  placeholder="Chọn công nghệ của công ty"
                  tokenSeparators={[","]}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                  }}
                  options={options}
                />
              </Space>
            </Form.Item>
            <Form.Item
              label="Yêu cầu công việc (Thêm '-' đầu dòng để bắt đầu một yêu cầu)"
              required
              tooltip="Trường này là bắt buộc"
            >
              <TextArea
                placeholder="Yêu cầu công việc "
                rows={3}
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
              <TextArea
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
              <TextArea
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
        )}
      </div>
    </PageComponent>
  );
};

export default EditJob;
