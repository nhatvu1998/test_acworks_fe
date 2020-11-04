import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Box, LoginForm } from "./styled";
import { signIn } from "./login.action";

const Login = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { username, password } = values;
    dispatch(signIn(username, password));
  };

  return (

    <Box
      type="flex"
      justify="space-around"
      align="middle"
      className="layout-login"
      style={{ height: "100vh" }}
    >
      <LoginForm>
        <Col>
          <div className="right-layout">
            <Form
              className="login-form"
              onFinish={handleSubmit}
              {...{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="username" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                {...{
                  wrapperCol: {
                    xs: {
                      span: 24,
                      offset: 0,
                    },
                    sm: {
                      span: 16,
                      offset: 8,
                    },
                  },
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </LoginForm>
    </Box>
  );
};

export default Login;
