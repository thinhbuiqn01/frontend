import { Alert, Popconfirm, Tag, notification } from "antd";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useStateContext } from "../../../context/ContextProvider";
import HireApply from "./HireApply";
import axiosClient from "../../../api/axiosClient";
import emailjs from "@emailjs/browser";

const colors = [
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const text = "Chỉ có sinh viên mới có thể ứng tuyển";
const description = "Bạn không phải là sinh viên ";

const HireContentJob = ({ jobs, business, isSchool }) => {
  const { currentUser } = useStateContext();
  const disabled = currentUser !== 1 ? true : false;
  console.log(isSchool);
  const [job, setJob] = useState();
  const [post, setPost] = useState(jobs);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const formRefAcceptant = useRef();

  const [sentEmail, setSentEmail] = useState(null);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleApply = (jobActive) => {
    showDrawer();
    setJob(jobActive);
    setLoading(true);
  };
  console.log(sentEmail);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Phê duyệt thành công",
      description: "Bây giờ sinh viên có thể xem được bài viết này",
    });
  };
  const handleAcceptant = (job) => {
    if (job.status == 1) {
      return;
    } else {
      setSentEmail({
        business_name: business.name,
        name_job: job.name_job,
        address: job.location,
        user_email: job.email_give,
      });
      axiosClient
        .post(`job-status-edit/${job.id}`, { status: true })
        .then((res) => {
          emailjs
            .sendForm(
              "service_2phamrk",
              "template_7xpioma",
              formRefAcceptant.current,
              "LOFR6vQG9zpxUvRSa"
            )
            .then(
              (result) => {
                openNotificationWithIcon("success");
              },
              (error) => {
                console.log(error.text);
              }
            );
          return true;
        })
        .then(() => {
          axiosClient.get(`business-job/${business.id}`).then((res) => {
            setPost(res.data.jobs);
          });
        });
    }
  };

  return (
    <>
      {contextHolder}
      <>
        {sentEmail !== null ? (
          <form ref={formRefAcceptant} style={{ display: "none" }}>
            <input
              type="text"
              name="business_name"
              value={sentEmail.business_name}
            />
            <input type="text" name="name_job" value={sentEmail.name_job} />
            <input
              type="text"
              name="address"
              value={sentEmail.address || "Đà Nẵng"}
            />
            <input
              type="email"
              name="user_email"
              value={sentEmail.user_email}
            />
            <input type="submit" value="Send" />
          </form>
        ) : (
          ""
        )}
      </>
      {loading ? (
        <HireApply
          job={job}
          business={business}
          onClose={onClose}
          open={open}
        />
      ) : (
        ""
      )}
      {post.map((job) => (
        <Wrapper key={job.id}>
          <div className="view-information">
            <div className="view-information__name">{job.name_job}</div>
            <div className="view-information__description">
              <h3>Mô tả công việc</h3>

              <ul>
                {job.description.split("\n").map((des, index) => (
                  <li key={index}>- {des}</li>
                ))}
              </ul>
            </div>
            <div className="view-information__require">
              <h3>Kỹ năng & Chuyên môn</h3>

              <ul>
                {job.require_job.split("\n").map((req, index) => (
                  <li key={index}>- {req}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="action">
            <div className="action__content">
              <>
                {isSchool ? (
                  <div>
                    <button onClick={(e) => handleAcceptant(job)}>
                      {job.status == 0 ? "Phê duyệt" : "Đã phê duyệt"}
                    </button>
                  </div>
                ) : (
                  <div>
                    {currentUser.role !== 1 ? (
                      <Popconfirm
                        placement="top"
                        title={text}
                        description={description}
                        okText="Tôi biết"
                        okType="danger"
                        cancelText="Tắt"
                      >
                        <button>Ứng tuyển</button>
                      </Popconfirm>
                    ) : (
                      <button onClick={(e) => handleApply(job)}>
                        Ứng tuyển
                      </button>
                    )}
                  </div>
                )}
              </>

              <div>
                <h3>Địa điểm làm việc</h3>
                <p>{job.location}</p>
              </div>
              <div>
                <h3>Kỹ năng</h3>
                {JSON.parse(job.tech_using).map((item, index) => (
                  <Tag
                    key={index}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                  >
                    {item.label}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      ))}
    </>
  );
};

export default HireContentJob;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;
  .view-information {
    width: 70%;
    margin: 1%;
    h3 {
      margin-top: 20px;
      font-weight: 600;
      font-size: 1.1rem;
    }

    &__name {
      font-size: 1.6rem;
      text-transform: uppercase;
      color: red;
      font-weight: 600;
      margin-bottom: 20px;
    }

    &__description {
    }

    &__require {
    }
  }
  .action {
    width: 28%;
    margin: 1%;
    button {
      display: block;
      width: 100%;
      background-color: #f32a0b;
      padding: 8px 0;
      border-radius: 4px;
      font-weight: 600;
      color: white;
    }
    div {
      margin: 10px 0;
      h3 {
        font-weight: bold;
      }
    }
  }
`;
