import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const options = [
  {
    key: 1,
    name: "Người dùng",
    icon: <UserOutlined />,
    children: [
      {
        key: 11,
        name: "Sinh viên",
        to: "/admin/sinh-vien",
      },
      {
        key: 12,

        name: "Nhà trường",
        to: "/admin/nha-truong",
      },
      {
        key: 13,

        name: "Doanh nghiệp",
        to: "/admin/doanh-nghiep",
      },
    ],
  },
  {
    key: 2,
    name: "Công việc",
    icon: <LaptopOutlined />,
    children: [
      {
        key: 21,

        name: "Ngành nghề",
        to: "/admin/nganh-nghe",
      },
      {
        key: 22,
        name: "Công nghệ",
        to: "/admin/cong-nghe",
      },
    ],
  },
  {
    name: "Công việc",
    icon: <UserOutlined />,
  },
  {
    name: "Thông báo",
    icon: <NotificationOutlined />,
  },
];

const items2 = options?.map((option, index) => {
  return {
    key: option.key,
    icon: option.icon,
    label: <NavLink to={option?.link}>{option.name}</NavLink>,
    children: option.children?.map((item, i) => {
      return {
        key: item.key,
        label: <NavLink to={item?.to}>{item.name}</NavLink>,
      };
    }),
  };
});

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          style={{
            background: colorBgContainer,
          }}
          width={200}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
            }}
            items={items2}
          />
        </Sider>

        <Layout className="site-layout">
          <Header
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 1,
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <div></div>
            <div></div>
            <div>
              <Link to={"/"}>
                <Button outline={true}> Trang người dùng</Button>{" "}
              </Link>
            </div>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            ></Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>

      {/* admin */}
    </div>
  );
};

export default Dashboard;
