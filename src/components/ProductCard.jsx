import { Card, Button } from "antd";
import { useState, useEffect } from "react";
import { ShoppingCartOutlined, EyeFilled } from "@ant-design/icons";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const { Meta } = Card;

const formatCurrency = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const ProductCard = ({ product }) => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://api-neiko.site/api/users/${userId}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy thông tin người dùng:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Card
      hoverable
      cover={
        <img
          alt={product.name}
          src={"https://api-neiko.site/" + product.image}
          className="product-image"
        />
      }
      className="product-card"
    >
      <Link to={`/product/${product._id}`}>
        <Meta title={product.name} />
      </Link>
      <div className="price-container">
        <div className="retail-price">
          Giá :{" "}
          {user && user.level === "client"
            ? formatCurrency(product.sizeInfo[0].retailPrice)
            : formatCurrency(product.sizeInfo[0].wholesalePrice)}
        </div>
        {/* <div className="wholesale-price">
          Giá sỉ: {formatCurrency(product.wholesalePrice)}
        </div> */}
      </div>
      <Link to={`/product/${product._id}`}>
        <Button
          type="primary"
          icon={<EyeFilled />}
          className="mt-4 w-full add-to-cart-button"
        >
          Xem chi tiết
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
