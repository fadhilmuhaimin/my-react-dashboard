import { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, message, Card, Flex, Tag, Button } from 'antd';
import { getProducts, deleteProduct, searchProducts } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import { useHeight } from '../../hook/useHeight';
import Search from 'antd/es/transfer/search';
import { UploadOutlined } from '@ant-design/icons';

const ProductManagementPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const height = useHeight(320);

    const fetchData = async (pageNum) => {
        try {
            setLoading(true);
            const skip = (pageNum - 1) * 20;
            const limit = 20;
            const { products, total } = await getProducts({ limit, skip });
            setData(products);
            setTotal(total);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            message.success('Product deleted');
            fetchData(page);
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleSearch = async (query) => {
        if (!query.trim()) {
            fetchData(1);
            return;
        }

        try {
            setLoading(true);
            const { products, total } = await searchProducts(query, 20, 0);
            setData(products);
            setTotal(total);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags) => (
              <span>
                {tags.map((tag, index) => {
                  let color = index % 2 === 0 ? 'green' : 'geekblue';
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </span>
            ),
          },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <a onClick={() => navigate(`/product-edit/${record.id}`)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <a style={{color:"red"}}>Delete</a>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Card
            style={{
                display: 'flex',
                overflow:'hidden',
                flexDirection: 'column',
                height: '100%',

            }}
        >
            <Flex justify="space-between" style={{ marginBottom: 20 }}>
                <Space>
                    <Search
                        placeholder="Input search text"
                        onSearch={(value) => handleSearch(value)} // Teruskan value ke handleSearch
                        enterButton
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 100 }}
                    />
                    
                </Space>
                <Button type="primary" icon={<UploadOutlined />} size={12} onClick={() => navigate(`/add-new-product/`)}>
            Add Product
          </Button>
            </Flex>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                scroll={{ y: height }}
                pagination={{
                    align: 'start',
                    current: page,
                    position: ['bottomLeft'],
                    total: total,
                    pageSize: 20,
                    onChange: (p) => setPage(p)
                }}
            />
        </Card>
    );
};

export default ProductManagementPage;
