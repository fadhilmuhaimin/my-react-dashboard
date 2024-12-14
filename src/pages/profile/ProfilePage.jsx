import React from 'react';
import { Descriptions, Avatar, Card } from 'antd';
import { useAuthStore } from '../../store/authStore';

const ProfilePage = () => {
  const { user } = useAuthStore();
  if(!user) return null;

  return (
    <Card>
      <Avatar src={user.image} size={64} style={{marginBottom:'20px'}}/>
      <Descriptions bordered title="User Info">
        <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
        <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProfilePage;
