import React from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Typography } from 'antd';


import { useNavigate, NavLink } from 'react-router-dom';
import {
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }) => {
  const { user, clearAuth } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    clearAuth();
    navigate('/login');
  };

  const dropdownMenu = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: onLogout,
    },];

  const menuItems = [
    {
      key: 'sub1',
      icon: <ShopOutlined />,
      label: 'Product',
      children: [
        { key: '1', label: <NavLink to="/">Product Performance</NavLink> },
        { key: '2', label: <NavLink to="/product-management">Manage Product</NavLink> }
      ]
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: <NavLink to="/profile">Profile</NavLink>
    }
  ];

  return (
    <Layout style={{ height: '100vh', width: '100vw' }}>
      <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {sidebarCollapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={toggleSidebar} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: '20px', cursor: 'pointer' }} onClick={toggleSidebar} />
          )}
          <AppstoreOutlined style={{ fontSize: '24px' }} />
          <Text strong style={{ fontSize: '16px' }}>Company</Text>
        </div>
        <Space align="center">
          <Text>Hi, {user?.firstName}</Text>
          <Dropdown menu={{ items: dropdownMenu }} trigger={['click']}>
            <Avatar src={user?.image} style={{ cursor: 'pointer' }} />
          </Dropdown>

        </Space>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{ background: '#fff' }}
          collapsible
          collapsed={sidebarCollapsed}
          trigger={null}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '20px', overflow: 'auto' }}>
          <Content style={{ background: '#fff', paddingLeft: '20px', paddingRight: '20px', borderRadius: '8px' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
