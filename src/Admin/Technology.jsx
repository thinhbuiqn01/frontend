import { Avatar, Card, List, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../api/axiosClient";
import { host } from "../utils/APIRoutes";

import img from "../assets/images/img.png";

const Technology = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userToken, currentUser } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (userToken && currentUser.role === 4) {
      axiosClient
        .get("technologies")
        .then((res) => {
          const data = res.data.tech;
          const formatData = data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              description: item.description,
              linkPage: item.link_page,
              image: item.image,
            };
          });
          setTechnologies(formatData);
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Wrapper>
      {loading == false ? (
        <div style={{ width: "700px", height: "300px", margin: "0 auto" }}>
          <Spin />
        </div>
      ) : (
        <List>
          {technologies.map((item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.image ? `${host}/uploads/${item.image}` : img}
                  />
                }
                title={
                  <Link to={`/admin/cong-nghe/edit/${item.id}`}>
                    {item.name}
                  </Link>
                }
                description={
                  item.description ? item.description : "Công nghệ lập trình"
                }
              />
            </List.Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default Technology;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;
