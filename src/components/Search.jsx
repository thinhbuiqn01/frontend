import { Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

import styled from "styled-components";

const Search = () => {
  const [size, setSize] = useState("middle");
  const [techs, setTechs] = useState([]);
  const [search, setSearch] = useState([]);

  const handleChange = (value, label) => {
    console.log(value, label);
    setSearch({value, label});
  };
  console.log(search);
  useEffect(() => {
    axiosClient
      .get("technologies")
      .then((res) => {
        const data = res.data.tech;
        setTechs(data);
      })
      .catch(123);
  }, []);

  const options = techs?.map((tech) => {
    return {
      value: tech.id,
      label: tech.name,
    };
  });

  return (
    <div>
      <>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Select
            mode="multiple"
            size={size}
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
        <Space
          direction="horizontal"
          style={{
            width: "100%",
          }}
        >
          {options.map((item) => (
            <Span key={item.value}>{item.label}</Span>
          ))}
        </Space>
      </>
    </div>
  );
};

export default Search;

const Span = styled.span`
  border: 0.01px solid #9f9e9e;
  padding: 4px 8px;
  border-radius: 2px;
  font-weight: 400;
`;
