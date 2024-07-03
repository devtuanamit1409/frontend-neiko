import React, { useState } from "react";
import { Button, Input, Form, Typography, Radio, Space } from "antd";

const { Title, Text } = Typography;

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Order placed with values:", values);
  };

  return (
    <div className="container mx-auto p-4 mt-[70px]">
      <Title level={2} className="mb-4 text-center">
        Thanh toán
      </Title>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Title level={4}>Thông tin giao hàng</Title>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Mời bạn nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Mời bạn nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Mời bạn nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Title level={4}>Phương thức thanh toán</Title>
          <Form.Item
            name="paymentMethod"
            initialValue={paymentMethod}
            rules={[
              {
                required: true,
                message: "Mời bạn chọn phương thức thanh toán!",
              },
            ]}
          >
            <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)}>
              <Space direction="vertical">
                <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
                <Radio value="bank">Chuyển khoản ngân hàng</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {paymentMethod === "bank" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <Text strong>Số tài khoản: </Text>
              <Text>123456789</Text>
              <br />
              <Text strong>Tên chủ tài khoản: </Text>
              <Text>Nguyen Van A</Text>
              <br />
              <Text strong>Ngân hàng: </Text>
              <Text>ABC Bank</Text>
            </div>
          )}

          <div className="flex justify-end mt-4">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="bg-blue-500 text-white"
            >
              Đặt hàng
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
