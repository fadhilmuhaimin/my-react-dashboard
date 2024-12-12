import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { useAuthStore } from '../../store/authStore';

import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

const { Title } = Typography;

const LoginPage = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await login(values.username, values.password);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('user', JSON.stringify(res));
      setAuth(res, res.accessToken, res.refreshToken);
      message.success('Login Successful!');
      navigate('/');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display:'flex', 
      justifyContent:'center', 
      alignItems:'center', 
      height:'100vh',
      width:'100vw', 
      background:'#f0f2f5'
    }}>
      <Card style={{ minWidth:300, width:'90%', maxWidth:400 }}>
        <Space direction="vertical" style={{width:'100%', marginBottom:'20px'}} align="center">
          <Title level={3}>Login</Title>
        </Space>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required:true, message:'Username required'}]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required:true, message:'Password required'}]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Login</Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
