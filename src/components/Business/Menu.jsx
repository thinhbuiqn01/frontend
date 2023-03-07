import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
const items = [
  /*   {
    label: "Tuyển dụng",
    key: "mail",
  }, */
  {
    label: "Công việc",
    key: "SubMenu",
    children: [
      {
        type: "group",
        label: "Quản lý công việc",
        children: [
          {
            label: <Link to="/doanh-nghiep/cong-viec/them">Đăng tuyển</Link>,
            key: "setting:1",
          },
        ],
      },
      {
        type: "group",
        label: "Xem công việc",
        children: [
          {
            label: (
              <Link to="/doanh-nghiep/cong-viec">Danh sách bài tuyển dụng</Link>
            ),
            key: "setting:3",
          },
        ],
      },
    ],
  },
  {
    label: <Link to="/doanh-nghiep/ho-so">Hồ sơ công ty</Link>,
    key: "alipay",
  },
];
const MenuBusiness = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default MenuBusiness;
