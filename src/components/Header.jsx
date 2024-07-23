import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Badge,
  Input,
  Drawer,
  Button,
  Modal,
  Table,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import axios from "axios";

const { Header } = Layout;
const { Search } = Input;

const AppHeader = () => {
  const userId = localStorage.getItem("userId");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleLinkClick = () => {
    setDrawerVisible(false);
  };

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `https://api-neiko.site/api/users/search?phone=${value}`
      );
      if (response.data.user.length > 0) {
        setSearchResults(response.data.user);
        setSearchModalVisible(true);
        setDrawerVisible(false);
      } else {
        message.error("Không tìm thấy người dùng với số điện thoại này.");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi trong quá trình tìm kiếm.");
    }
  };

  const closeSearchModal = () => {
    setSearchModalVisible(false);
    setSearchResults([]);
  };

  const searchColumns = [
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
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Hoạt động" : "Chưa hoạt động"),
    },
  ];

  return (
    <Header className="header">
      <div className="logo-container">
        <Link to={userId !== null ? "/home" : "/"} className="logo">
          NEIKO
        </Link>
      </div>
      <div className="search-container">
        <Search
          placeholder="Search"
          enterButton={<SearchOutlined />}
          className="search-input"
          onSearch={handleSearch}
        />
      </div>
      <div className="menu-container">
        <Menu mode="horizontal" className="menu">
          <Menu.Item key="cart1" className="menu-item">
            <Link
              to={userId !== null ? "/cart" : "/"}
              onClick={handleLinkClick}
            >
              <Badge>
                <ShoppingCartOutlined
                  style={{ fontSize: "20px", color: "#fff" }}
                />
              </Badge>
              Giỏ hàng
            </Link>
          </Menu.Item>
          <Menu.Item key="user" className="menu-item">
            <Link
              to={userId !== null ? "/profile" : "/"}
              onClick={handleLinkClick}
            >
              <UserOutlined style={{ fontSize: "20px", color: "#fff" }} />
              Hồ sơ
            </Link>
          </Menu.Item>
          <Menu.Item key="referrals" className="menu-item">
            <Link
              to={userId !== null ? "/referrals" : "/"}
              onClick={handleLinkClick}
            >
              <TeamOutlined style={{ fontSize: "20px", color: "#fff" }} />
              Quản lý tài khoản khách giới thiệu
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <Button
        className="mobile-menu-button"
        type="primary"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        className="mobile-drawer"
      >
        <Search
          placeholder="Search"
          enterButton={<SearchOutlined />}
          className="drawer-search-input"
          onSearch={handleSearch}
        />
        <Menu mode="vertical" className="drawer-menu">
          <Menu.Item key="cart1" className="drawer-menu-item">
            <Link
              to={userId !== null ? "/cart" : "/"}
              onClick={handleLinkClick}
            >
              <ShoppingCartOutlined
                style={{ fontSize: "20px", color: "#000" }}
              />
              <span className="drawer-menu-text">Giỏ hàng</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="user" className="drawer-menu-item">
            <Link
              to={userId !== null ? "/profile" : "/"}
              onClick={handleLinkClick}
            >
              <UserOutlined style={{ fontSize: "20px", color: "#000" }} />
              <span className="drawer-menu-text">Hồ sơ</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="referrals" className="drawer-menu-item">
            <Link
              to={userId !== null ? "/referrals" : "/"}
              onClick={handleLinkClick}
            >
              <TeamOutlined style={{ fontSize: "20px", color: "#000" }} />
              <span className="drawer-menu-text">
                Quản lý tài khoản khách giới thiệu
              </span>
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
      <Modal
        title="Kết quả tìm kiếm"
        visible={searchModalVisible}
        onCancel={closeSearchModal}
        footer={null}
      >
        <Table
          columns={searchColumns}
          dataSource={searchResults}
          rowKey="_id"
          pagination={false}
        />
      </Modal>
    </Header>
  );
};

export default AppHeader;
