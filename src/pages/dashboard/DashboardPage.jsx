// src/pages/dashboard/DashboardPage.jsx

import { Row, Col } from 'antd';
import { DashboardTopUsers } from '../../components/common/dashboard/DashboardTopUsers';
import { DashboardDeals } from '../../components/common/dashboard/DashboardDeals';

const DashboardPage = () => {
  return (
    <Row gutter={[32,32]} style={{
        marginTop: "0px",
      }}>
      <Col xs={24}
          sm={24}
          xl={8}
          style={{
            height: "300px",
          }}>
        <DashboardTopUsers />
      </Col>
      <Col xs={24}
          sm={24}
          xl={16}>
        <DashboardDeals />
      </Col>
    </Row>

    
  );
};

export default DashboardPage;
