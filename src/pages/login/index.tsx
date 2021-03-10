import "./styles.css";
import useLogin from "../../hooks/use-login";
import { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Layout, Typography } from "antd";
import type { RouteComponentProps } from "@reach/router";
import type { Credentials } from "../../entities/credentials";

export default function Login(_: RouteComponentProps) {
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  useLogin(credentials);

  return (
    <Layout className="full-page login">
      <Card size="small" className="login-container">
        <Typography.Title>Login</Typography.Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={setCredentials}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
}
