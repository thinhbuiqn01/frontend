import { Button, Form, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const FormTech = ({
  name,
  detail,
  status,
  image,
  linkWebsite,
  params,
  setName,
  setDetail,
  setLinkWebsite,
  setStatus,
  handleSubmitData,
  handleChangeImage,
}) => {
  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          width: "100%",
        }}
      >
        <Form.Item label="Tên công nghệ">
          <TextArea
            value={name}
            rows={1}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Select value={status} onChange={(e) => setStatus(e)}>
            <Select.Option value="1">Kích hoạt</Select.Option>
            <Select.Option value="0">Tắt</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả">
          <TextArea
            value={detail}
            rows={4}
            onChange={(e) => setDetail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Trang chủ công nghệ">
          <TextArea
            value={linkWebsite}
            rows={1}
            onChange={(e) => setLinkWebsite(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Chọn hình ảnh">
          <input
            name="images[]"
            type="file"
            multiple
            className="avatar-uploader"
            onChange={(e) => handleChangeImage(e)}
          />
        </Form.Item>

        <Form.Item label={params ? "Chỉnh sửa" : "Thêm mới"}>
          <Button onClick={(e) => handleSubmitData()}>
            {params ? "Chỉnh sửa" : "Thêm mới"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTech;
