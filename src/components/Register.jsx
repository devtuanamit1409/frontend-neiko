import React from "react";
import { Form, Input, Button, Card, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  IdcardOutlined,
  HomeOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const { data } = await axios.post(
        "http://localhost:8888/api/users/create",
        {
          username: values.username,
          name: values.fullname,
          password: values.password,
          phone: values.phone,
          address: values.address,
          aboutCode: values.workCode,
          level: "client", // Add default level
        }
      );
      notification.success({
        message: "Đăng ký thành công",
        description: data.message,
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: "Lỗi Đăng ký",
        description:
          error.response?.data?.message || "Có lỗi xảy ra khi đăng ký.",
      });
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <h2 className="register-title">Đăng ký</h2>
        <Form
          name="register"
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
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Mời bạn nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Nhập lại mật khẩu"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Mời bạn nhập số điện thoại!" }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: "Mời bạn nhập họ và tên!" }]}
          >
            <Input
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              placeholder="Họ và tên"
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Mời bạn nhập địa chỉ!" }]}
          >
            <Input
              prefix={<HomeOutlined className="site-form-item-icon" />}
              placeholder="Địa chỉ"
            />
          </Form.Item>
          <Form.Item
            name="workCode"
            rules={[{ required: true, message: "Mời bạn nhập mã làm việc!" }]}
          >
            <Input
              prefix={<NumberOutlined className="site-form-item-icon" />}
              placeholder="Mã làm việc"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Đăng ký
            </Button>
            <div className="login-link">
              <Link to="/">Đã có tài khoản? Đăng nhập ngay</Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
