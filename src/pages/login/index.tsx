import "./styles.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Card, Form, Input, Button, Layout, Typography } from "antd";
import type { RouteComponentProps } from "@reach/router";

export default function Login(_: RouteComponentProps) {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Layout className="full-page">
      <Card size="small" className="login-container">
        <Typography.Title>Login</Typography.Title>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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
