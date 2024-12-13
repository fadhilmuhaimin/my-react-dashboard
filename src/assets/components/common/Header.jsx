
import { Layout, Avatar, Dropdown, Space, Typography, Button } from 'antd';
import { useMediaQuery } from 'react-responsive'; // Import React Responsive
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { IconMenu3 } from '@tabler/icons-react';
import { useAuthStore } from '../../../store/authStore';
import { useUIStore } from '../../../store/uiStore';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, clearAuth } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const navigate = useNavigate();

  // Media query untuk mendeteksi layar mobile (<= 768px)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

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
    },
  ];

  return (
    <AntHeader
      style={{
        background: '#fff',
        padding: '0 20px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // Column layout untuk mobile
        alignItems: isMobile ? 'flex-start' : 'center', // Align kiri di mobile
        justifyContent: 'space-between',
        gap: isMobile ? '10px' : '0',
        marginBottom: '20px',
        marginTop: '20px',
        borderRadius: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row', // Kolom di mobile
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '10px',
        }}
      >
        <Button
          onClick={toggleSidebar}
          type={sidebarCollapsed ? 'primary' : undefined}
          icon={<IconMenu3 size={18} />}
        />
        <Typography.Text
          strong
          style={{
            fontSize: '16px',
            textAlign: isMobile ? 'left' : 'center', // Rata kiri di mobile
          }}
        >
          Example React Dashboard
        </Typography.Text>
      </div>
      <Space
        align={isMobile ? 'start' : 'center'}
        style={{
          alignSelf: isMobile ? 'flex-start' : 'center', // Posisikan ke kiri di mobile
          width: isMobile ? '100%' : 'auto', // Lebar penuh di mobile
          justifyContent: isMobile ? 'space-between' : 'flex-end', // Rata penuh di mobile
        }}
      >
        <Typography.Text>Hi, {user?.firstName}</Typography.Text>
        <Dropdown menu={{ items: dropdownMenu }} trigger={['click']}>
          <Avatar src={user?.image} style={{ cursor: 'pointer' }} />
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
