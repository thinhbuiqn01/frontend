import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const SearchData = () => {
  const { setSearch, search } = useStateContext();
  return (
    <WrapperSearch>
      <div className="search__text">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <Link to={"/search"}>Search</Link>
        </button>
      </div>
    </WrapperSearch>
  );
};

export default SearchData;

const WrapperSearch = styled.div`
  width: 80%;
  margin: 20px auto;
  .search__text {
    width: 80%;
    margin: 0 auto;
    display: flex;
    input {
      width: 90%;
      border: 1px solid #333;
      border-radius: 10px 0px 0px 10px;
      padding: 6px 10px;
      display: block;
      width: ;
    }
    button {
      width: 10%;
      background-color: #1677ff;
      color: white;
      border-radius: 0 10px 10px 0;
    }
    @media only screen and (max-width: 800px) {
      width: 90%;
      input {
        width: 85%;
      }
      button {
        width: 15%;
      }
    }
    @media only screen and (max-width: 500px) {
      width: 80%;

      input {
        width: 80%;
      }
      button {
        width: 20%;
      }
    }
  }
`;
