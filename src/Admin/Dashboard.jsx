import {
  LaptopOutlined,
  NotificationOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

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
    key: 0,
    name: "Dashboard",
    icon: <UnorderedListOutlined />,
    children: [
      {
        key: 0.1,
        name: "Thống kê",
        to: "/admin ",
      },
    ],
  },
  {
    key: 1,
    name: "Sinh viên",
    icon: <UserOutlined />,
    children: [
      {
        key: 11,
        name: "Danh sách sinh viên",
        to: "/admin/sinh-vien",
      },
      {
        key: 12,
        name: "Thêm danh sách sinh viên",
        to: "/admin/sinh-vien/them",
      },
    ],
  },
  {
    key: 2,
    name: "Nhà trường",
    icon: <UserOutlined />,
    children: [
      {
        key: 21,
        name: "Danh sách tài khoản",
        to: "/admin/nha-truong",
      },
      {
        key: 22,
        name: "Thêm tài khoản cho trường",
        to: "/admin/nha-truong/them",
      },
    ],
  },

  {
    key: 3,
    name: "Công việc",
    icon: <LaptopOutlined />,
    children: [
      {
        key: 31,
        name: "Công việc",
        to: "/admin/cong-viec",
      },
      {
        key: 32,
        name: "Công nghệ",
        to: "/admin/cong-nghe",
      },
      {
        key: 33,
        name: "Thêm công nghệ",
        to: "/admin/cong-nghe/them",
      },
    ],
  },

  {
    key: 4,
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          width={250}
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
                background: "#ffffff0",
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
