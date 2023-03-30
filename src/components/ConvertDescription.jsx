import React from "react";
import styled from "styled-components";

const ConvertDescription = ({ data }) => {
  // let convertArray = data.replace(/-/gi, "");
  let convertArray = data.split("\n");
  //console.log(convertArray);
  return (
    <Ul>
      {convertArray.map((item, index) => (
        <li key={index}>{item.replace(/-/gi, "")}</li>
      ))}
    </Ul>
  );
};

export default ConvertDescription;

const Ul = styled.ul`
  list-style-type: circle;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  line-height: 1.6rem; 

  li {
    font-size: 0.9rem;
    /* animation: autoLight 0.5s infinite;

    @keyframes autoLight {
      0% {
        color: red;
      }
      50% {
        color: black;
      }
    } */
  }
`;
