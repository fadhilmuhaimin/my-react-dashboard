
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';


const MainLayout = () => {
  return (
    <Layout
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}
    >
      <Sidebar />
      <Layout style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Header />
        <Layout.Content
          style={{
            overflow: 'auto',
            height: 'calc(100vh - 124px)',
            marginBottom:'20px',
          }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
