import React, { useState } from "react";
import { Card, Typography, Button, List, Modal } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  ShareAltOutlined,
  WalletOutlined,
  EditOutlined,
  ShoppingOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Profile = () => {
  // Example user data
  const [user] = useState({
    username: "john_doe",
    fullName: "John Doe",
    phone: "0912345678",
    email: "john.doe@example.com",
    address: "123 Main St, Hanoi, Vietnam",
    referralCode: "REF12345",
    balance: 1500000,
  });

  // Example order data
  const [orders, setOrders] = useState([
    {
      id: "123456",
      date: "2023-01-01",
      total: 385000,
      status: "Đã giao",
      items: [
        { name: "Sản phẩm 1", quantity: 1, price: 100000 },
        { name: "Sản phẩm 2", quantity: 2, price: 142500 },
      ],
    },
    {
      id: "654321",
      date: "2023-02-15",
      total: 245000,
      status: "Đang xử lý",
      items: [{ name: "Sản phẩm 3", quantity: 1, price: 245000 }],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
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
              <Text className="block">{user.fullName}</Text>
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
              <Text className="block">{user.referralCode}</Text>
            </div>
          </div>
          <div className="flex items-center">
            <WalletOutlined className="text-xl mr-2 text-orange-500" />
            <div>
              <Text strong>Số dư:</Text>
              <Text className="block">{user.balance.toLocaleString()} đ</Text>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <Button
            type="primary"
            className="bg-blue-500 text-white"
            icon={<EditOutlined />}
          >
            Chỉnh sửa thông tin
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
              key={order.id}
              actions={[
                <Button
                  key={order.id}
                  icon={<EyeOutlined />}
                  onClick={() => handleViewOrder(order)}
                >
                  Xem
                </Button>,
                <Button
                  key={order.id}
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteOrder(order.id)}
                  danger
                >
                  Xóa
                </Button>,
              ]}
              extra={<ShoppingOutlined className="text-4xl text-blue-500" />}
            >
              <List.Item.Meta
                title={<Text strong>ID Đơn hàng: {order.id}</Text>}
                description={
                  <>
                    <Text>Ngày đặt hàng: {order.date}</Text>
                    <br />
                    <Text>Tổng tiền: {order.total.toLocaleString()} đ</Text>
                    <br />
                    <Text>Trạng thái: {order.status}</Text>
                  </>
                }
              />
            </List.Item>
          )}
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
            <Text strong>ID Đơn hàng: {selectedOrder.id}</Text>
            <br />
            <Text>Ngày đặt hàng: {selectedOrder.date}</Text>
            <br />
            <Text>Tổng tiền: {selectedOrder.total.toLocaleString()} đ</Text>
            <br />
            <Text>Trạng thái: {selectedOrder.status}</Text>
            <br />
            <Title level={4} className="mt-4">
              Sản phẩm
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={selectedOrder.items}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text>{item.name}</Text>}
                    description={
                      <>
                        <Text>Số lượng: {item.quantity}</Text>
                        <br />
                        <Text>Giá: {item.price.toLocaleString()} đ</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
