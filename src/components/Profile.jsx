import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  List,
  Modal,
  notification,
  Pagination,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  ShareAltOutlined,
  WalletOutlined,
  EyeOutlined,
  LogoutOutlined,
  DeleteOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getUserData();
    getUserOrders(page);
  }, [page]);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `https://api-neiko.site/api/users/${userId}`
      );
      setUser(response.data.user);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi lấy thông tin người dùng",
      });
    }
  };

  const getUserOrders = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(
        `https://api-neiko.site/api/orders/${userId}`,
        {
          params: { page, limit },
        }
      );
      setOrders(response.data.orders);
      setTotalOrders(response.data.totalOrders);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi lấy danh sách đơn hàng",
      });
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`https://api-neiko.site/api/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
      notification.success({
        message: "Thành công",
        description: "Đơn hàng đã được xóa",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra khi xóa đơn hàng",
      });
    }
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };
  return (
    <div className="container mx-auto p-4 mt-[70px]">
      <Title level={2} className="mb-4 text-center">
        Thông tin cá nhân
      </Title>
      <Card className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <UserOutlined className="text-xl mr-2 text-blue-500" />
            <div>
              <Text strong>Tên tài khoản:</Text>
              <Text className="block">{user.username}</Text>
            </div>
          </div>
          <div className="flex items-center">
            <UserOutlined className="text-xl mr-2 text-blue-500" />
            <div>
              <Text strong>Họ tên:</Text>
              <Text className="block">{user.name}</Text>
            </div>
          </div>
          <div className="flex items-center">
            <PhoneOutlined className="text-xl mr-2 text-green-500" />
            <div>
              <Text strong>Số điện thoại:</Text>
              <Text className="block">{user.phone}</Text>
            </div>
          </div>
          <div className="flex items-center">
            <MailOutlined className="text-xl mr-2 text-red-500" />
            <div>
              <Text strong>Email:</Text>
              <Text className="block">{user.email}</Text>
            </div>
          </div>
          <div className="flex items-center">
            <HomeOutlined className="text-xl mr-2 text-yellow-500" />
            <div>
              <Text strong>Địa chỉ:</Text>
              <Text className="block">{user.address}</Text>
            </div>
          </div>
          <div className="flex items-center">
            <ShareAltOutlined className="text-xl mr-2 text-purple-500" />
            <div>
              <Text strong>Mã giới thiệu:</Text>
              <Text className="block">{user.code}</Text>
            </div>
          </div>
          <div className="flex items-center">
            <WalletOutlined className="text-xl mr-2 text-orange-500" />
            <div>
              <Text strong>Số dư:</Text>
              <Text className="block">{user.balance?.toLocaleString()} đ</Text>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => handleLogout()}
            type="primary"
            className="bg-blue-500 text-white"
            icon={<LogoutOutlined />}
          >
            Đăng Xuất
          </Button>
        </div>
        <Title level={3} className="mb-4 text-center">
          Đơn hàng của bạn
        </Title>
        <List
          itemLayout="vertical"
          dataSource={orders}
          renderItem={(order) => (
            <List.Item
              key={order._id}
              extra={<ShoppingOutlined className="text-4xl text-blue-500" />}
            >
              <List.Item.Meta
                title={<Text strong>ID Đơn hàng: {order._id}</Text>}
                description={
                  <>
                    <Text>
                      Ngày đặt hàng:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Text>
                    <br />
                    <Text>
                      Tổng tiền: {order.totalPrice.toLocaleString()} đ
                    </Text>
                    <br />
                    <Text>
                      Trạng thái: {order.isDelivered ? "Đã giao" : "Đang xử lý"}
                    </Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
        <Pagination
          current={page}
          pageSize={10}
          total={totalOrders}
          onChange={(page) => setPage(page)}
          className="text-center mt-4"
        />
      </Card>

      <Modal
        visible={!!selectedOrder}
        title="Chi tiết đơn hàng"
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <Text strong>ID Đơn hàng: {selectedOrder._id}</Text>
            <br />
            <Text>
              Ngày đặt hàng:{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </Text>
            <br />
            <Text>
              Tổng tiền: {selectedOrder.totalPrice.toLocaleString()} đ
            </Text>
            <br />
            <Text>
              Trạng thái: {selectedOrder.isDelivered ? "Đã giao" : "Đang xử lý"}
            </Text>
            <br />
            <Title level={4} className="mt-4">
              Sản phẩm
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={selectedOrder.orderItems}
              renderItem={(item) => {
                const product = item.product || {};
                const sizeInfo = product.sizeInfo || [];
                const sizeDetail =
                  sizeInfo.find((si) => si.size === item.size) || {};

                return (
                  <List.Item>
                    <List.Item.Meta
                      title={<Text>{product.name}</Text>}
                      description={
                        <>
                          <Text>Số lượng: {item.qty}</Text>
                          <br />
                          <Text>
                            Giá:{" "}
                            {sizeDetail.retailPrice
                              ? sizeDetail.retailPrice.toLocaleString()
                              : "N/A"}{" "}
                            đ
                          </Text>
                        </>
                      }
                    />
                  </List.Item>
                );
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
