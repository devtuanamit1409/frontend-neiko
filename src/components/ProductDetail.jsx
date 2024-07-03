import React, { useState } from "react";
import { Card, Button, InputNumber, Radio, Space, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);

  const handleAddToCart = () => {
    console.log("Product added to cart with details:", {
      size,
      color,
      type,
      quantity,
    });
  };

  const handleBuyNow = () => {
    console.log("Buy now with details:", { size, color, type, quantity });
  };

  return (
    <div className="container mx-auto p-4 mt-[70px]">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-1/2 p-2">
          <img
            src="https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg" // Thay bằng URL ảnh thực tế của sản phẩm
            alt="Product"
            className="rounded-lg w-full"
          />
        </div>
        <div className="w-full lg:w-1/2 p-2">
          <Card className="md:p-6">
            <Title level={2}>
              Dầu xả Kaminomoto kích thích mọc tóc chai 300ml Nhật Bản
            </Title>
            <Text type="secondary">Thương hiệu: Kaminomoto</Text>
            <br />
            <Text type="secondary">Barcode: 4987046870032</Text>
            <br />
            <Text type="success">Tình trạng: Còn hàng</Text>
            <div className="py-4 flex justify-between">
              <h2 className="text-[18px] md:text-[25px]">
                Giá lẻ :
                <span className="font-bold text-[#52c41a]">385.000đ</span>
              </h2>
              <h2 className="text-[18px] md:text-[25px]">
                Giá sỉ :
                <span className="font-bold text-[#ff4d4f]">385.000đ</span>
              </h2>
            </div>
            <ul className="list-none p-0">
              <li className="mb-2">
                Giúp loại bỏ gàu và ngứa, ngăn chặn tình trạng viêm da, duy trì
                da đầu khỏe mạnh
              </li>
              <li className="mb-2">
                Ngăn chặn hình thành gàu, giúp da đầu sạch nhẹ nhàng và mát rượi
              </li>
            </ul>

            <div className="mt-4">
              <Space direction="vertical" size="large" className="w-full">
                <div className="mb-4">
                  <Text strong>Chọn size:</Text>
                  <Radio.Group className="ml-2">
                    <Radio.Button
                      value="small"
                      className="custom-radio-button"
                      onClick={() => setSize("small")}
                    >
                      Nhỏ
                    </Radio.Button>
                    <Radio.Button
                      value="medium"
                      className="custom-radio-button"
                      onClick={() => setSize("medium")}
                    >
                      Vừa
                    </Radio.Button>
                    <Radio.Button
                      value="large"
                      className="custom-radio-button"
                      onClick={() => setSize("large")}
                    >
                      Lớn
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div className="mb-4">
                  <Text strong>Chọn màu sắc:</Text>
                  <Radio.Group className="ml-2">
                    <Radio.Button
                      value="red"
                      className="custom-radio-button"
                      onClick={() => setColor("red")}
                    >
                      Đỏ
                    </Radio.Button>
                    <Radio.Button
                      value="blue"
                      className="custom-radio-button"
                      onClick={() => setColor("blue")}
                    >
                      Xanh
                    </Radio.Button>
                    <Radio.Button
                      value="black"
                      className="custom-radio-button"
                      onClick={() => setColor("black")}
                    >
                      Đen
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div className="mb-4">
                  <Text strong>Chọn kiểu:</Text>
                  <Radio.Group className="ml-2">
                    <Radio.Button
                      value="straight"
                      className="custom-radio-button"
                      onClick={() => setType("straight")}
                    >
                      Thẳng
                    </Radio.Button>
                    <Radio.Button
                      value="curly"
                      className="custom-radio-button"
                      onClick={() => setType("curly")}
                    >
                      Xoăn
                    </Radio.Button>
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

              <Text strong>Gọi tổng đài để mua nhanh: 0915127166</Text>
              <div className="mt-4">
                <p>🚚 GIAO HÀNG SỚM NHẤT (Giao sớm trong ngày)</p>
                <p>🔄 ĐỔI TRẢ MIỄN PHÍ (Nếu phát hiện hỏng hóc)</p>
                <p>💳 THANH TOÁN (Hình thức linh hoạt)</p>
              </div>
            </Space>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
