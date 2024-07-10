import { useState, useEffect } from "react";
import { Button, notification, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://api-neiko.site/api/users/${userId}`
      );
      setUser(response.data.user);
      setCartItems(response.data.user.cart);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://api-neiko.site/api/users/removecartitem`, {
        data: { userId, itemId: id },
      });
      const newCartItems = cartItems.filter((item) => item._id !== id);
      setCartItems(newCartItems);
      notification.success({
        message: "Thành công",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng",
      });
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((acc, item) => {
      if (!item.product) return acc; // Bỏ qua sản phẩm có giá trị null
      const sizeDetail = item.product.sizeInfo.find(
        (si) => si.size === item.size
      );
      const price =
        user.level === "client"
          ? sizeDetail.retailPrice
          : sizeDetail.wholesalePrice || sizeDetail.defaultPrice;
      return acc + price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="container mx-auto p-4 mt-[70px]">
      <Title level={2} className="mb-4 text-center">
        Giỏ hàng của bạn
      </Title>
      <div className="bg-white shadow-md rounded-lg p-4">
        {cartItems
          .filter((item) => item.product) // Bỏ qua sản phẩm có giá trị null
          .map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between mb-4"
            >
              <div className="flex items-center">
                <img
                  src={"https://api-neiko.site/" + item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 mr-4 rounded"
                />
                <div>
                  <Text className="block font-semibold">
                    {item.product.name}
                  </Text>
                  <Text className="block text-gray-500">
                    {user.level === "client"
                      ? item.product.sizeInfo
                          .find((si) => si.size === item.size)
                          .retailPrice.toLocaleString("vi-VN")
                      : item.product.sizeInfo
                          .find((si) => si.size === item.size)
                          .wholesalePrice.toLocaleString("vi-VN") ||
                        item.product.sizeInfo
                          .find((si) => si.size === item.size)
                          .defaultPrice.toLocaleString("vi-VN")}{" "}
                    đ
                  </Text>
                  <Text className="block text-gray-500">Size: {item.size}</Text>
                </div>
              </div>
              <div className="flex items-center mt-2 md:mt-0">
                <Text className="mr-2">Số lượng: {item.quantity}</Text>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveItem(item._id)}
                />
              </div>
              <div className="mt-2 md:mt-0">
                <Text className="block font-semibold">
                  {(user.level === "client"
                    ? item.product.sizeInfo.find((si) => si.size === item.size)
                        .retailPrice
                    : item.product.sizeInfo.find((si) => si.size === item.size)
                        .wholesalePrice ||
                      item.product.sizeInfo.find((si) => si.size === item.size)
                        .defaultPrice
                  ).toLocaleString("vi-VN")}
                  đ x {item.quantity}
                </Text>
              </div>
            </div>
          ))}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <Text className="text-lg font-bold">
            Tổng cộng: {calculateTotalAmount().toLocaleString("vi-VN")} đ
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
