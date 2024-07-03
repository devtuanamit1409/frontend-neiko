import { Card, Button } from "antd";
import { ShoppingCartOutlined, EyeFilled } from "@ant-design/icons";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";

const { Meta } = Card;

const formatCurrency = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      cover={
        <img alt={product.name} src={product.image} className="product-image" />
      }
      className="product-card"
    >
      <Link to="/product/1">
        <Meta title={product.name} />
      </Link>
      <div className="price-container">
        <div className="retail-price">
          Giá lẻ: {formatCurrency(product.retailPrice)}
        </div>
        <div className="wholesale-price">
          Giá sỉ: {formatCurrency(product.wholesalePrice)}
        </div>
      </div>
      <Link to="/product/1">
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
