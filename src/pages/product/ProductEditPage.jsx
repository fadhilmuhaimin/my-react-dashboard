import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, message, Row, Col, Typography, Card, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';

const { TextArea } = Input;
const { Title } = Typography;

const LOADING_TYPES = {
  INITIAL: 'INITIAL',
  SUBMIT: 'SUBMIT',
};

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(null); // Single state for loading

  const fetchData = async () => {
    setLoading(LOADING_TYPES.INITIAL);
    try {
      const product = await getProductById(id);
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
      });
    } catch (error) {
      message.error(error.message || 'Failed to load product data');
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onFinish = async (values) => {
    setLoading(LOADING_TYPES.SUBMIT);
    try {
      await updateProduct(id, values);
      message.success('Product Updated!');
      navigate('/product-management');
    } catch (error) {
      message.error(error.message || 'Failed to update product');
    } finally {
      setLoading(null);
    }
  };

  const isInitialLoading = loading === LOADING_TYPES.INITIAL;
  const isSubmitLoading = loading === LOADING_TYPES.SUBMIT;

  return (
    <Card>
      <Title level={4}>Edit Product</Title>
      {isInitialLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh', // Sesuaikan tinggi agar di tengah
          }}
        >
          <Spin tip="Loading product data..." size="large" />
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Product Title" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Product Description" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select placeholder="Select a category">
                  <Select.Option value="beauty">Beauty</Select.Option>
                  <Select.Option value="electronics">Electronics</Select.Option>
                  <Select.Option value="clothing">Clothing</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) =>
                    value ? parseFloat(value.replace(/\$\s?|(,*)/g, '')) : 0
                  }
                  placeholder="Price in USD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="discountPercentage" label="Discount (%)" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                  placeholder="Discount %"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={5}
                  step={0.1}
                  placeholder="Rating (0-5)"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
                <InputNumber style={{ width: '100%' }} min={0} placeholder="Stock Quantity" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={isSubmitLoading}>
            Save
          </Button>
        </Form>
      )}
    </Card>
  );
};

export default ProductEditPage;
