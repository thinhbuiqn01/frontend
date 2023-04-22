import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWardAsync,
  addWard,
  removeWard,
  addWardAsync,
} from "../../redux/slices/taskSlice";
import styled from "styled-components";
const Task = () => {
  const wardData = useSelector((state) => {
    return state.ward;
  });
  console.log(wardData);
  const dispatch = useDispatch();
  const [ward, setWard] = useState("");

  return (
    <Wrapper>
      <input
        type="text"
        value={ward}
        onChange={(e) => setWard(e.target.value)}
      />

      {/* <button
        style={{ border: "1px solid #333" }}
        onClick={() => useDispatch(getTaskAsync(taskName))}
      >
        Add Task
      </button> */}
      <button
        style={{ border: "1px solid #333" }}
        onClick={() => dispatch(addWard(ward))}
      >
        Add Ward
      </button>
      <button
        style={{ border: "1px solid #333" }}
        onClick={() => dispatch(getWardAsync())}
      >
        {wardData.status === "loading" ? "Loading" : "Call dữ liệu phường xã"}
      </button>
      <button
        style={{ border: "1px solid #333" }}
        onClick={() => dispatch(removeWard(ward))}
      >
        Xóa dữ liệu
      </button>

      <button
        style={{ border: "1px solid #333" }}
        onClick={() => dispatch(addWardAsync(ward))}
      >
        {wardData.status === "Loading" ? "Loading" : "Thêm "}
      </button>

      <ul>
        {wardData.wards.map((ward, index) => (
          <li key={ward.id}>+ {ward.name}</li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Task;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 100px;
  background-color: #6af694;
  input {
    border: 1px solid #333;
    border-radius: 8px;
  }
  button {
    background-color: red;
    border: none !important;
    margin: 10px;
    color: white;
    border-radius: 6px;
    padding: 8px 10px;
  }
`;
