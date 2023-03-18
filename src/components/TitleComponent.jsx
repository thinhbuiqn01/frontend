import React from "react";
import styled from "styled-components";

const TitleComponent = ({ title }) => {
  return <Title>{title}</Title>;
};

export default TitleComponent;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #ef3737;
  text-transform: uppercase;
  margin: 10px 0;
`;
