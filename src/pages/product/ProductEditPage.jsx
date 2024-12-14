import  { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading,setLoading] = useState(false);

  const fetchData = async() => {
    try {
      const product = await getProductById(id);
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(()=>{
    fetchData();
  },[id]);

  const onFinish = async(values) => {
    setLoading(true);
    try {
      await updateProduct(id, values);
      message.success('Product Updated!');
      navigate('/product-management');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{required:true}]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{required:true}]}>
        <Input.TextArea rows={4}/>
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{required:true}]}>
        <Select>
          <Select.Option value="beauty">Beauty</Select.Option>
          <Select.Option value="electronics">Electronics</Select.Option>
          <Select.Option value="clothing">Clothing</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{required:true}]}>
        <InputNumber style={{width:'100%'}} />
      </Form.Item>
      <Form.Item name="discountPercentage" label="Discount (%)" rules={[{required:true}]}>
        <InputNumber style={{width:'100%'}} />
      </Form.Item>
      <Form.Item name="rating" label="Rating" rules={[{required:true}]}>
        <InputNumber style={{width:'100%'}} min={0} max={5}/>
      </Form.Item>
      <Form.Item name="stock" label="Stock" rules={[{required:true}]}>
        <InputNumber style={{width:'100%'}} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
    </Form>
  );
};

export default ProductEditPage;
