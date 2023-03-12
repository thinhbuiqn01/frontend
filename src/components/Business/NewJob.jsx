import { Alert, Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useStateContext } from "../../context/ContextProvider";
import PageComponent from "../PageComponent";
import Marquee from "react-fast-marquee";
import MenuBusiness from "./Menu";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const NewJob = () => {
  const { currentUser } = useStateContext();
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [techUsing, setTechUsing] = useState("");
  const [techs, setTechs] = useState([]);
  const [requireJob, setRequireJob] = useState("");
  const [description, setDescription] = useState("");
  const [locationWork, setLocationWork] = useState("");
  const [emailGiveCV, setEmailGiveCV] = useState("");
  const [business, setBusiness] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get(`business/${currentUser.id}`)
      .then((res) => setBusiness(res.data.business))
      .catch((e) => console.log(e));
    axiosClient
      .get("technologies")
      .then((res) => {
        setTechs(res.data.tech);
      })
      .catch((e) => console.log(e));
  }, []);
  const handleGiveJob = () => {
    const jobs = {
      name,
      techUsing,
      requireJob,
      description,
      locationWork,
      emailGiveCV: emailGiveCV,
      business_id: business.id,
      status: 0,
    };
    const giveJob = async () => {
      const response = await axiosClient.post("give-job", jobs);
      const response1 = await axiosClient.post("create-inform-job-school", {
        job_id: response.data.data.id,
        name: `Thông báo tuyển dụng`,
        status: 1,
        role_take: 2,
        description: `Thông báo tuyển dụng của doanh nghiệp ${business.name}`,
      });
      console.log(response1);
    };
    giveJob();
    navigate("/doanh-nghiep/cong-viec");
  };

  const options = techs?.map((tech) => {
    return {
      value: tech.id,
      label: tech.name,
    };
  });

  const handleChange = (value, label) => { 
    setTechUsing(JSON.stringify(label));
  }; 
  return (
    <PageComponent title={<MenuBusiness />}>
      {currentUser?.status == 0 ? (
        <Alert
          banner
          message={
            <Marquee>Công ty bạn chưa được cấp quyền để tuyển dụng</Marquee>
          }
        />
      ) : (
        <div>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên công việc"
              required
              tooltip="Trường này là bắt buộc"
            >
              <Input
                placeholder="Tên công việc"
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
                  placeholder="Nhập từ khóa tìm kiếm"
                  defaultValue={options.slice(0)}
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
              label="Yêu cầu công việc"
              required
              tooltip="Trường này là bắt buộc"
            >
              <Input
                placeholder="Yêu cầu công việc"
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
                onChange={(e) => setEmailGiveCV(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" danger block onClick={handleGiveJob}>
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </PageComponent>
  );
};

export default NewJob;
