
import { Layout, Menu, Button } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { UserOutlined, ShopOutlined, DashboardOutlined } from '@ant-design/icons';
import { useUIStore } from '../../store/uiStore';
import { useEffect } from 'react';
import { IconMenu3 } from '@tabler/icons-react';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: <NavLink to="/">Dashboard</NavLink>
  },
  {
    key: '/product',
    icon: <ShopOutlined />,
    label: 'Product',
    children: [
      { key: '/product-overview', label: <NavLink to="/product-overview">Product Overview</NavLink> },
      { key: '/product-management', label: <NavLink to="/product-management">Manage Product</NavLink> }
    ]
  },
  {
    key: '/profile',
    icon: <UserOutlined />,
    label: <NavLink to="/profile">Profile</NavLink>
  }
];

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUIStore();

  const location = useLocation();

  const getSelectedKeys = () => {
    switch (true) {
      case location.pathname === '/': // Untuk DashboardPage
        return ['/dashboard'];
  
      case location.pathname.startsWith('/product-edit'):
        return ['/product-management']; // Sorot menu 'Product Management' untuk 'ProductEditPage'
  
      case location.pathname.startsWith('/add-new-product'):
        return ['/product-management']; // Sorot menu 'Product Management' untuk 'AddNewProduct'
  
      case location.pathname.startsWith('/product-detail/'):
        return ['/product-overview']; // Sorot menu 'Product Overview' untuk 'ProductDetail'
  
      default:
        return [location.pathname]; // Gunakan pathname langsung untuk URL lainnya
    }
  };
  
  

    useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = (e) => {
      setSidebarCollapsed(e.matches); // Tertutup jika ukuran layar kecil
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Set awal ketika komponen dimuat
    setSidebarCollapsed(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [setSidebarCollapsed]);

  return (
    <Sider
      width={200}
      style={{ background: 'white' }}
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
    >
      <div style={{ textAlign: 'center', margin: '10px 0' }}>
        
        <Button
          onClick={toggleSidebar}
          type={sidebarCollapsed ? 'primary' : undefined}
          icon={<IconMenu3 size={18} />}
        />
      </div>

      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={['/dashboard']}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
