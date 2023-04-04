import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAsync,
  //getTaskAsync,
  selectTask,
} from "../../redux/slices/taskSlice";

const Task = () => {
  const taskData = useSelector(selectTask);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  return (
    <div style={{ paddingTop: "50px" }}>
      <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />

      {/* <button
        style={{ border: "1px solid #333" }}
        onClick={() => useDispatch(getTaskAsync(taskName))}
      >
        Add Task
      </button> */}

      <button
        style={{ border: "1px solid #333" }}
        onClick={() => dispatch(addTaskAsync(taskName))}
      >
        {taskData.status === "loading" ? "Loading" : "Add Task Async"}
      </button>

      <ul>
        {taskData.tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
