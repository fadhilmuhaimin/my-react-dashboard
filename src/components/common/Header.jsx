
import { Layout, Avatar, Dropdown, Space, Typography, Image } from 'antd';
import { useMediaQuery } from 'react-responsive'; // Import React Responsive
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../store/authStore';



const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, clearAuth } = useAuthStore();

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
          flexDirection:  'row', // Kolom di mobile
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: '10px',
        }}
      >
        <Image
          preview={false}
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          style={{ width: 35, height: 35 }}
        />
       
      </div>
      <Space
        align={ 'center'}
        style={{
          alignSelf: 'center', // Posisikan ke kiri di mobile
          width:'auto', // Lebar penuh di mobile
          justifyContent: 'flex-end', // Rata penuh di mobile
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
