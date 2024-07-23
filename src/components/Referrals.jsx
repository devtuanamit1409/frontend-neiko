import React, { useEffect, useState } from "react";
import { Table, Card, message, Button, Modal, Tag } from "antd";
import axios from "axios";

const Referrals = () => {
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchReferredUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api-neiko.site/api/users/get-referred-users/669f58bf5cc69e6d68f76d67"
        );
        setReferredUsers(response.data.referredUsers);
        message.success(response.data.message);
      } catch (error) {
        message.error("Failed to fetch referred users");
      } finally {
        setLoading(false);
      }
    };

    fetchReferredUsers();
  }, []);

  const handleViewOrders = (user) => {
    setCurrentUser(user);
    setOrders(user.orders);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setCurrentUser(null);
    setOrders([]);
  };

  const handleActivateUser = async (userId) => {
    try {
      await axios.put(`https://api-neiko.site/api/users/active-user/${userId}`);
      message.success("Người dùng đã được kích hoạt thành công");

      setReferredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: true } : user
        )
      );
    } catch (error) {
      message.error("Lỗi khi kích hoạt người dùng");
    }
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mã giới thiệu",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <div>
          {isActive ? (
            <Tag color="green">Hoạt động</Tag>
          ) : (
            <Button
              type="primary"
              size="small"
              style={{
                backgroundColor: "red",
                borderColor: "red",
                color: "white",
                marginLeft: "10px",
              }}
              onClick={() => handleActivateUser(record._id)}
            >
              Kích hoạt
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      fixed: "right",
      render: (text, record) => (
        <Button onClick={() => handleViewOrders(record)}>Xem đơn</Button>
      ),
    },
  ];

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const orderColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "orderItems",
      key: "orderItems",
      render: (orderItems) =>
        orderItems.map((item) => (
          <div key={item._id}>
            {item.qty} x {item.product.name} ({item.size})
          </div>
        )),
    },
    {
      title: "Địa chỉ",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => formatter.format(totalPrice),
    },
    {
      title: "Hoa hồng",
      dataIndex: "commission",
      key: "commission",
      render: (commission) => formatter.format(commission),
    },
  ];

  return (
    <Card title="Referred Users" style={{ margin: "20px" }}>
      <Table
        columns={columns}
        dataSource={referredUsers}
        rowKey="_id"
        loading={loading}
        pagination={false}
        scroll={{ x: 1000 }} // Đảm bảo bảng có thể cuộn theo chiều ngang
      />
      <Modal
        title={`Orders of ${currentUser?.name}`}
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        width="90%" // Đặt chiều rộng cho modal
        style={{ top: 20 }} // Đặt khoảng cách từ đỉnh trang để modal nằm gọn hơn
      >
        <Table
          columns={orderColumns}
          dataSource={orders}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 1000 }} // Đảm bảo bảng có thể cuộn theo chiều ngang
        />
      </Modal>
    </Card>
  );
};

export default Referrals;
