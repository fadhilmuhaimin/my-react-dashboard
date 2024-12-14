// src/components/dashboard/DashboardTopUsers.jsx
import  { useEffect, useState } from 'react';
import { Card, List, message, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Text from '../Text';
import { getTopUsers } from '../../../services/dashboardService';
import { CustomAvatar } from '../CustomAvatar';

export const DashboardTopUsers = () => {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const users = await getTopUsers();
      setData(users);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <Card
      className="custom-dashboard-card"
      title={
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <UserOutlined />
          <Text size="sm" style={{ marginLeft: '.5rem' }}>Top Users</Text>
        </div>
      }
    >
      {loading ? (
        <Skeleton active />
      ) : (
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<CustomAvatar src={item.image} shape="square" />}
                title={<Text strong>{item.firstName} {item.lastName}</Text>}
                description={
                  <div>
                    <div>{item.email}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
  
};
