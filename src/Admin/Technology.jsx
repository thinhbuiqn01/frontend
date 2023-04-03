import { Avatar, Card, List, Spin } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import img from "../assets/images/img.png";
import { host } from "../utils/APIRoutes";
import { Link } from "react-router-dom";
const Technology = () => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
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
    </>
  );
};

export default Technology;
