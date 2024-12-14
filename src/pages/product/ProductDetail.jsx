
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Typography } from 'antd';
import ProductInformation from '../../assets/components/common/product/ProductInformation';
import ProductRating from '../../assets/components/common/product/ProductRating';

const { Title } = Typography;

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state; // Mengambil data produk yang dikirim via state

  return (
    <Card style={{ borderRadius: 10 }}>
      <Row style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Title level={3} style={{ margin: 0 }}>
            Product Detail
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {/* Product Information */}
        <Col xs={24} lg={16} style={{ flex: 5 }}>
          <ProductInformation product={product} />
        </Col>
        {/* Product Rating */}
        <Col xs={24} lg={8} style={{ flex: 5 }}>
          <ProductRating reviews={product.reviews} />
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetail;
