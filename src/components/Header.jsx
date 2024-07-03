import { Layout, Menu, Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/Header.css";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <Link to="/" className="logo">
        NEIKO
      </Link>
      <div className="menu-container">
        <Menu mode="horizontal" className="menu">
          <Menu.Item key="cart1" className="menu-item">
            <Link to="/cart">
              <Badge count={5}>
                <ShoppingCartOutlined
                  style={{ fontSize: "20px", color: "#fff" }}
                />
              </Badge>
            </Link>
          </Menu.Item>
          <Menu.Item key="user" className="menu-item">
            <Link to="/login">
              <UserOutlined style={{ fontSize: "20px", color: "#fff" }} />
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
