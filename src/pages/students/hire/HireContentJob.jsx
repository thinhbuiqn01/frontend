import { Popconfirm, Tag } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { useStateContext } from "../../../context/ContextProvider";
import HireApply from "./HireApply";

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

const HireContentJob = ({ jobs, business }) => {
  const { currentUser } = useStateContext();
  const disabled = currentUser !== 1 ? true : false;

  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <>
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
      {jobs.map((job) => (
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
                  <button onClick={(e) => handleApply(job)}>Ứng tuyển</button>
                )}
              </div>
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
