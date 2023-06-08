import { Avatar, List, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axiosClient from "../api/axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { host } from "../utils/APIRoutes";

import img from "../assets/images/img.png";
import Loading from "../components/Loading";

const Technology = () => {
  const [technologies, setTechnologies] = useState([]);
  const [technologiesFilter, setTechnologiesFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userToken, currentUser } = useStateContext();
  const [search, setSearch] = useState("");
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
          setTechnologiesFilter(formatData);
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/");
    }
  }, []);

  const handleSearch = (e) => {
    let toUpSearch = search.toUpperCase();
    const filterUsers = technologies?.filter((user) => {
      let nameSearch = user.name.toUpperCase();
      return nameSearch.includes(toUpSearch);
    });
    setTechnologiesFilter(filterUsers);
  };

  return (
    <Wrapper>
      {loading == false ? (
        <div style={{ width: "700px", height: "300px", margin: "0 auto" }}>
          <Loading />
        </div>
      ) : (
        <>
          <Input>
            <input
              type="text"
              placeholder="Tìm kiếm"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={(e) => handleSearch(e)}>Tìm kiếm</button>{" "}
          </Input>
          <List>
            {technologiesFilter.map((item) => (
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
        </>
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

const Input = styled.div`
  padding: 10px 0%;
  width: 40%;
  display: flex;
  input {
    border-radius: 4px 0 0 4px;

    width: 80%;
    border: 1px solid #5ab0db;
  }
  input[type="text"]:focus {
    outline: none;
    border-radius: 4px 0 0 4px;

    box-shadow: 0px 0px 5px #61c5fa;
    border: 1px solid #5ab0db;
  }
  input[type="text"]:focus:hover {
    border-radius: 4px 0 0 4px;
    outline: none;
    box-shadow: 0px 0px 5px #61c5fa;
    border: 1px solid #5ab0db;
  }
  button {
    width: 20%;
    border: 1px solid #5ab0db;
    border-radius: 0 4px 4px 0;
  }
`;
