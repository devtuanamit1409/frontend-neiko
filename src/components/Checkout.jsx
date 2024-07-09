import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Form,
  Typography,
  Radio,
  Space,
  Divider,
  notification,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");

  const getUserCart = async () => {
    try {
      const response = await axios.get(
        `https://api-neiko.site/api/users/${userId}`
      );
      setUser(response.data.user);
      setCartItems(response.data.user.cart);

      // Set default values in form
      form.setFieldsValue({
        name: response.data.user.name,
        phone: response.data.user.phone,
        address: response.data.user.address,
      });
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy giỏ hàng của người dùng:", error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  const calculateTotalAmount = () => {
    return cartItems.reduce((acc, item) => {
      const sizeDetail = item.product.sizeInfo.find(
        (si) => si.size === item.size
      );
      const price = sizeDetail.retailPrice;
      return acc + price * item.quantity;
    }, 0);
  };

  const handleFinish = async (values) => {
    try {
      const order = {
        user: userId,
        orderItems: cartItems.map((item) => ({
          product: item.product._id,
          qty: item.quantity,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: values.address,
        paymentMethod,
        referrerCode: user.aboutCode, // Lấy mã giới thiệu từ thông tin user
        phone: values.phone,
        name: values.name,
        note: values.note,
      };

      await axios.post(`https://api-neiko.site/api/orders/create`, order);
      notification.success({
        message: "Thành công",
        description: "Đơn hàng của bạn đã được đặt thành công",
      });
      form.resetFields(); // Reset form sau khi đặt hàng thành công
      navigate("/profile");
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi đặt hàng",
      });
    }
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
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Mời bạn nhập số điện thoại!" }]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Mời bạn nhập địa chỉ!" }]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Title level={4}>
            Phương thức thanh toán (Lưu ý: Chuyển Khoản Ngân Hàng sẽ được miễn
            phí vận chuyển)
          </Title>
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

          <Title level={4}>Chi tiết đơn hàng</Title>
          {cartItems.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={"https://api-neiko.site/" + item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 mr-4 rounded"
                  />
                  <div>
                    <Text strong>{item.product.name}</Text>
                    <Text className="block">
                      {item.product.sizeInfo
                        .find((si) => si.size === item.size)
                        .retailPrice.toLocaleString("vi-VN")}{" "}
                      đ x {item.quantity}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Text>Size: {item.size}</Text>
                <Text>Màu: {item.color}</Text>
              </div>
              <Divider />
            </div>
          ))}
          <div className="flex items-center justify-between">
            <Text strong>Tổng cộng:</Text>
            <Text strong>
              {calculateTotalAmount().toLocaleString("vi-VN")} đ
            </Text>
          </div>

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
