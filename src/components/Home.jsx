import React, { useState, useEffect } from "react";
import { Pagination, Spin } from "antd";
import ProductCard from "./ProductCard";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 8; // Số sản phẩm trên mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8888/api/products", {
          params: { page: currentPage, limit: pageSize },
        });
        setProducts(response.data.products);
        setTotalProducts(response.data.totalPages * pageSize);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy sản phẩm:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  console.log(products);
  return (
    <div className="container mx-auto p-4 pt-[70px] md:pt-[100px]">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalProducts}
              onChange={handleChangePage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
