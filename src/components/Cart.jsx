import { useState } from "react";
import { Button, InputNumber, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Dầu xả Kaminomoto kích thích mọc tóc chai 300ml Nhật Bản",
      price: 385000,
      quantity: 1,
      image:
        "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
    },
    {
      id: 2,
      name: "Dầu gội Kaminomoto kích thích mọc tóc chai 300ml Nhật Bản",
      price: 345000,
      quantity: 2,
      image:
        "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
    },
  ]);

  const handleQuantityChange = (id, quantity) => {
    const newCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(newCartItems);
  };

  const handleRemoveItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 mt-[70px]">
      <Title level={2} className="mb-4 text-center">
        Giỏ hàng của bạn
      </Title>
      <div className="bg-white shadow-md rounded-lg p-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between mb-4"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 mr-4 rounded"
              />
              <div>
                <Text className="block font-semibold">{item.name}</Text>
                <Text className="block text-gray-500">
                  {item.price.toLocaleString()} đ
                </Text>
              </div>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => handleQuantityChange(item.id, value)}
                className="mr-2"
              />
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveItem(item.id)}
              />
            </div>
            <div className="mt-2 md:mt-0">
              <Text className="block font-semibold">
                {(item.price * item.quantity).toLocaleString()} đ
              </Text>
            </div>
          </div>
        ))}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <Text className="text-lg font-bold">
            Tổng cộng: {totalAmount.toLocaleString()} đ
          </Text>
          <Link to="/checkout">
            <Button
              type="primary"
              size="large"
              className="bg-blue-500 text-white mt-2 md:mt-0"
            >
              Thanh toán
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
