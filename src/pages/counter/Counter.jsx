import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/slices/counterSlice";
import Task from "./Task";

const Counter = () => {
  const count = useSelector((state) => {
    return state.counter.value;
  });
  console.log(count);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleIncrement = () => {
    dispatch(increment(value));
  };
  const handleDecrement = () => {
    dispatch(decrement(value));
  };
  return (
    <>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <div className="">{count}</div>

      <Task />
    </>
  );
};

export default Counter;
