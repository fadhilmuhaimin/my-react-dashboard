import  { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, Button, message, Skeleton, Row, Col, Typography, Alert, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getProductCategories, addProduct } from '../../services/productService';

const { TextArea } = Input;
const { Title } = Typography;

const AddNewProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [categoryState, setCategoryState] = useState({
        loading: true,
        error: null,
        data: []
    });

    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setCategoryState({ loading: true, error: null, data: [] });
        try {
            const categories = await getProductCategories();
            setCategoryState({
                loading: false,
                error: null,
                data: categories
            });
        } catch (error) {
            setCategoryState({
                loading: false,
                error: error.message || 'Failed to load categories',
                data: []
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {
                title: values.title,
                description: values.description,
                category: values.category,
                price: values.price,
                discountPercentage: values.discountPercentage,
                rating: values.rating,
                stock: values.stock
            };
            await addProduct(payload);
            message.success('Product added successfully!');
            navigate('/product-management');
        } catch (error) {
            message.error(error.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Title level={4}>Add New Product</Title>
            {categoryState.error && (
                <Alert
                    message="Error"
                    description={categoryState.error}
                    type="error"
                    showIcon
                    action={
                        <Button size="small" onClick={fetchCategories}>
                            Retry
                        </Button>
                    }
                    style={{ marginBottom: '20px' }}
                />
            )}
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
                            {categoryState.loading ? (
                                <Skeleton.Input active style={{ width: '100%' }} />
                            ) : (
                                <Select placeholder="Select a category">
                                    {categoryState.data.map((cat) => (
                                        <Select.Option key={cat} value={cat}>
                                            {cat}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                            <InputNumber
                                style={{ width: '100%' }}
                                formatter={(value) =>
                                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                }
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

                <Button type="primary" htmlType="submit" loading={loading}>
                    Save
                </Button>
            </Form>
        </Card>
    );
};

export default AddNewProduct;
