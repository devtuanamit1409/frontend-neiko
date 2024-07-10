import React, { useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.post(
        "http://localhost:8888/api/users/login",
        {
          username: values.username,
          password: values.password,
        }
      );

      notification.success({
        message: "Đăng nhập thành công",
        description: "Bạn đã đăng nhập thành công.",
      });

      localStorage.setItem("userId", data.user._id);

      // Redirect to the home page or another page after successful login
      window.location.href = "/home";
    } catch (error) {
      notification.error({
        message: "Lỗi Đăng nhập",
        description:
          error.response?.data?.message || "Có lỗi xảy ra khi đăng nhập.",
      });
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2 className="login-title">Đăng nhập</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Mời bạn nhập tên tài khoản!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên tài khoản"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Mời bạn nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type={passwordVisible ? "text" : "password"}
              placeholder="Mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Đăng nhập
            </Button>
            <div className="register-link">
              <Link to="/register">Chưa có tài khoản? Đăng ký ngay</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
