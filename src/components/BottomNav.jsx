// BottomNav.jsx
import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../styles/BottomNav.css";

const { Item } = Menu;

const BottomNav = () => {
  return (
    <Menu mode="horizontal" className="bottom-nav">
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="search" icon={<SearchOutlined />}>
        <Link to="/search">Search</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">Cart</Link>
      </Item>
      <Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Item>
    </Menu>
  );
};

export default BottomNav;
