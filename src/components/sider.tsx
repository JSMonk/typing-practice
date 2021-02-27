import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  FileOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

export default function Sider() {
  const [collapsed, onCollapse] = useState(false);

  return (
    <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          User
        </Menu.Item>
        <Menu.Item key="3" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
