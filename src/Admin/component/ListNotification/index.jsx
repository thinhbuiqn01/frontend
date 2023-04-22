import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";

const Index = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {}, []);

  return (
    <div>
      <h3 className="p-4 font-semibold text-base">Thông báo</h3>
    </div>
  );
};

export default Index;
