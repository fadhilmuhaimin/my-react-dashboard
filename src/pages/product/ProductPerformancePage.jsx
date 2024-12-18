import { useEffect, useState } from 'react';
import { Row, Col, Card, Pagination, message, Button, Avatar, Skeleton } from 'antd';
import { getProducts } from '../../services/productService';
import { useHeight } from '../../hook/useHeight';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';

const ProductPerformancePage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // Tambahkan state untuk loading
  const height = useHeight(220);
  const navigate = useNavigate();

  const fetchData = async (pageNum) => {
    try {
      setLoading(true);
      const skip = (pageNum - 1) * 12;
      const limit = 12;
      const { products, total } = await getProducts({ limit, skip });
      setProducts(products);
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

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Row gutter={[16, 16]} style={{ flex: 1, overflow: 'auto', height: height,}} key={loading}>
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
            // Skeleton untuk loading placeholder
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                style={{ height: '100%', width: '100%' }} // Pastikan Card memiliki lebar penuh
                cover={
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150, width: '100%' }}>
                    <Skeleton.Image
                      active
                      style={{
                        height: 150 , // Memastikan skeleton mengisi penuh div
                        width: 150,
                        borderRadius: 8,
                      }}
                    />
                  </div>
                }
              >
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>

            </Col>
          ))
          : products.map((product) => (
            <Col xs={24} sm={12} md={6} key={product.id}>
              <Card
                cover={<img alt="example" src={product.images} style={{ height: 180, objectFit: 'contain' }} />}
                hoverable
                actions={[
                  <div style={{
                    padding: '0 20px',
                    display: 'flex', // Aktifkan flexbox
                    justifyContent: 'center', // Rata tengah horizontal (opsional)
                    alignItems: 'center', // Rata tengah vertikal
                    height: '100%', // Pastikan elemen mengambil seluruh tinggi parent
                  }} key={product.id}>
                    <Button type="primary" style={{ width: '100%' }} onClick={() => navigate(`/product-detail/`, { state: product })}>
                      View Detail
                    </Button>
                  </div>,
                ]}
                style={{ height: '100%' }}
              >
                <Meta
                  style={{
                    marginBottom: 20,
                    display: 'flex', // Flexbox untuk tata letak horizontal
                    alignItems: 'center', // Rata tengah secara vertikal
                    gap: '0px', // Jarak antar avatar dan title
                  }}
                  avatar={
                    <Avatar
                      src={product.thumbnail}
                      size={40} // Atur ukuran avatar agar konsisten
                      style={{ margin: 0, flexShrink: 0 }}
                    />
                  }
                  title=
                   
                      {product.title}
                
                  
                />

                <div
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {product.description}
                </div>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>
              </Card>
            </Col>
          ))}
      </Row>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Pagination
          current={page}
          total={total}
          pageSize={12}
          onChange={(p) => setPage(p)}
        />
      </div>
    </Card>
  );
};

export default ProductPerformancePage;
