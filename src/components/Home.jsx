import React, { useState } from "react";
import { Pagination } from "antd";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Dầu gội mọc tóc",
    retailPrice: 250000,
    wholesalePrice: 200000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
  {
    id: 2,
    name: "Serum trị gàu",
    retailPrice: 300000,
    wholesalePrice: 240000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
  {
    id: 3,
    name: "Mặt nạ dưỡng tóc",
    retailPrice: 350000,
    wholesalePrice: 280000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
  {
    id: 4,
    name: "Dầu dưỡng thảo mộc",
    retailPrice: 400000,
    wholesalePrice: 320000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
  {
    id: 5,
    name: "Dầu gội kiểm soát gàu",
    retailPrice: 220000,
    wholesalePrice: 180000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
  {
    id: 6,
    name: "Dầu xả dưỡng ẩm",
    retailPrice: 280000,
    wholesalePrice: 220000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
  {
    id: 7,
    name: "Xịt tạo phồng",
    retailPrice: 320000,
    wholesalePrice: 260000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
  {
    id: 8,
    name: "Tinh chất phục hồi",
    retailPrice: 380000,
    wholesalePrice: 300000,
    image:
      "https://res.cloudinary.com/dj1vhqp5w/image/upload/v1719975302/fwtucmqls5zaoswdnh9t.jpg",
  },
];

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số sản phẩm trên mỗi trang

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const currentProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto p-4 pt-[70px] md:pt-[100px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Home;
