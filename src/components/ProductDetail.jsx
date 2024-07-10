import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  InputNumber,
  Radio,
  Space,
  Typography,
  notification,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [price, setPrice] = useState(0);

  const handleAddToCart = async () => {
    try {
      await axios.post(`http://localhost:8888/api/users/addtocart`, {
        userId,
        productId: id,
        quantity,
        size,
      });
      notification.success({
        message: "Thành công",
        description: "Sản phẩm đã được thêm vào giỏ hàng",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng",
      });
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/users/${userId}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/products/${id}`
      );
      const productData = response.data.product;
      setProduct(productData);
      setSize(productData.sizeInfo[0].size);
      setColor(productData.colorInfo[0].color);
      updatePrice(productData.sizeInfo[0].size, response.data.user.level);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy thông tin sản phẩm:", error);
    }
  };

  const updatePrice = (selectedSize, level) => {
    if (!product) return;

    const sizeInfo = product.sizeInfo.find((s) => s.size === selectedSize);

    const newPrice =
      level === "client"
        ? sizeInfo.retailPrice
        : level === "agency"
        ? sizeInfo.wholesalePrice
        : sizeInfo.defaultPrice;

    setPrice(newPrice);
  };

  useEffect(() => {
    getUser();
    getProduct();
  }, [userId, id]);

  useEffect(() => {
    if (product && size && user) {
      updatePrice(size, user.level);
    }
  }, [size, user]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  console.log(user.level);

  return (
    <div className="container mx-auto p-4 mt-[70px]">
      {product && (
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/2 p-2">
            <img
              src={`http://localhost:8888/${product.image}`}
              alt="Product"
              className="rounded-lg w-full"
            />
          </div>
          <div className="w-full lg:w-1/2 p-2">
            <Card className="md:p-6">
              <Title level={2}>{product.name}</Title>
              <div className="py-4 flex justify-between">
                <h2 className="text-[18px] md:text-[25px]">
                  Giá :
                  <span className="font-bold text-[#52c41a]">
                    {formatPrice(price)}
                  </span>
                </h2>
              </div>
              <ul className="list-none p-0">
                <li className="mb-2">{product.description}</li>
              </ul>

              <div className="mt-4">
                <Space direction="vertical" size="large" className="w-full">
                  <div className="mb-4">
                    <Text strong>Chọn mã:</Text>
                    <Radio.Group
                      className="ml-2"
                      value={size}
                      onChange={(e) => {
                        const newSize = e.target.value;
                        setSize(newSize);
                        updatePrice(newSize, user.level);
                      }}
                    >
                      {product.sizeInfo.map((size) => (
                        <Radio.Button
                          key={size._id}
                          value={size.size}
                          className="custom-radio-button"
                        >
                          {size.size}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </div>
                </Space>
              </div>

              <div className="mt-4 mb-6">
                <Text strong>Số lượng:</Text>
                <div className="flex items-center">
                  <Button
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  >
                    -
                  </Button>
                  <InputNumber
                    className="mx-2"
                    min={1}
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                  />
                  <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
              </div>

              <Space direction="vertical" size="large" className="w-full">
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  block
                  className="bg-blue-500 text-white py-6 rounded-lg"
                >
                  Thêm vào giỏ hàng
                </Button>

                <div className="mt-4">
                  <p>🚚 GIAO HÀNG SỚM NHẤT (Giao sớm trong ngày)</p>
                  <p>🔄 ĐỔI TRẢ MIỄN PHÍ (Nếu phát hiện hỏng hóc)</p>
                  <p>💳 THANH TOÁN (Hình thức linh hoạt)</p>
                </div>
              </Space>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
